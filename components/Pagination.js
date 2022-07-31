import Link from 'next/link';
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
`;


export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <StyledUl>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index}>
          <Link href={ `/blog/pagination/${number}`}>
            <a>{number}</a>
          </Link>
        </li>
      ))}
    </StyledUl>
  );
};