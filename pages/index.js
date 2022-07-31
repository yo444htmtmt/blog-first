import Head from "next/head";
import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "../components/Pagination";

export default function Home({ blog, category, totalCount }) {
  return (
    <>
      <Head>
        <title>Yblog</title>
      </Head>
      <div>
        <ul>
          {category.map((category) => (
            <li key={category.id}>
              <Link href={`/category/${category.id}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {blog.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} />
      </div>
    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { limit: 20, offset: 0, limit: 5 },
  });
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      totalCount: data.totalCount,
    },
  };
};
