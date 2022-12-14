import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import { renderToc } from "../../libs/render-toc";
import { TableOfContents } from "../../components/TableOfContents";
import Link from "next/link";
import styled from "styled-components";

export default function BlogId({ blog }) {
  const toc = renderToc(blog.body);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className="category">{blog.category && `${blog.category.name}`}</p>
      {blog.toc_visible && <TableOfContents toc={toc} />}
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
      <Link href="/">
        <a>ホームへ</a>
      </Link>
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
