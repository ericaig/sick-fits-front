import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query {
    products: _allProductsMeta {
      total: count
    }
  }
`;

export default function Pagination({ page: _page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const {
    products: { total: count },
  } = data;

  const pageCount = Math.ceil(count / perPage);
  const page = Number(_page);

  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}