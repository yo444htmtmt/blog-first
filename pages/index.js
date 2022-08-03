import Head from "next/head";
import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "../components/Pagination";
import { groupBy } from "../libs/util";
import {
  Box,
  List,
  Link as ChakraLink,
  ListItem,
  HStack,
} from "@chakra-ui/react";

export default function Home({ blog, category, totalCount, monthlyIndex }) {
  return (
    <>
      <Link href="/" passHref>
        <ChakraLink fontSize={40} pl={3} _hover={{ textDecoration: "none" }}>
          Yblog
        </ChakraLink>
      </Link>

      <Head>
        <title>Yblog</title>
      </Head>

      <Box>
        <List display="flex" bgColor="Black" w="100%" mt={5}>
          {category.map((category) => (
            <ListItem key={category.id} m={5}>
              <Link href={`/category/${category.id}`}>
                <ChakraLink color="white">{category.name}</ChakraLink>
              </Link>
            </ListItem>
          ))}
        </List>

        <h3>記事一覧</h3>
        <List pb={20} mt={5}>
          {blog.map((blog) => (
            <ListItem key={blog.id}>
              <Link href={`/blog/${blog.id}`}>
                <a>{blog.title}</a>
              </Link>
            </ListItem>
          ))}
        </List>

        <h3>月別アーカイブ</h3>
        <List>
          {Object.keys(monthlyIndex).map((index) => (
            <ListItem key={blog.id}>
              <Link href={`archive/${index}`}>
                {index.split("_")[0] + "年" + index.split("_")[1] + "月"}
              </Link>
              （{monthlyIndex[index].length}）
            </ListItem>
          ))}
        </List>
        
        <Box mt={10}>
          <Pagination totalCount={totalCount} />
        </Box>
      </Box>
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
  const publishedAt = await client.get({
    endpoint: "blog",
    queries: { fields: "publishedAt", limit: 3000 },
  });
  const monthlyIndex = groupBy(publishedAt.contents);

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      totalCount: data.totalCount,
      contents: publishedAt.contents,
      monthlyIndex: monthlyIndex,
    },
  };
};
