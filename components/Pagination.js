import Link from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <List>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <ListItem key={index}>
          <Link href={ `/blog/pagination/${number}`}>
            <a>{number}</a>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};