import { client } from "../../libs/client";
import Link from "next/link";
import { groupBy } from "../../libs/util";

export default function BlogId({ title, blog }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">
        <a>ホームへ</a>
      </Link>
    </div>
  );
}

// 1. パスを生成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const monthlyIndex = groupBy(data.contents, "publishedAt");

  const paths = Object.keys(monthlyIndex).map((index) => `/archive/${index}`);
  return { paths, fallback: false };
};

// 2. 該当月のブログ記事を取得
export const getStaticProps = async (context) => {
  const date = context.params.date;
  const year = date.split("_")[0];
  const month = date.split("_")[1];

  // microCMSのfiltersクエリは >= を表現できないので開始時刻は1ミリ秒引いておく
  const startOfMonthTmp = new Date(year, month - 1, 1);

  const startOfMonth = new Date(startOfMonthTmp.getTime() - 1);

  const endOfMonth = new Date(year, month, 1);
  
  // filtersクエリで該当月の記事のみを取得
  const filters = `publishedAt[greater_than]${startOfMonth.toISOString()}[and]publishedAt[less_than]${endOfMonth.toISOString()}`;

  const data = await client.get({
    endpoint: "blog",
    queries: {
      filters: filters,
    },
  });

  return {
    props: {
      title: `${year}年${month}月の記事一覧`,
      blog: data.contents,
    },
  };
};
