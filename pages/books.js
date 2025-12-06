/*********************************************************************************
* WEB422 – Assignment 2
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: William Danh Student ID: 182291237 Date: 11/10/2025
*
********************************************************************************/

import { useRouter } from "next/router";
import useSWR from "swr";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const queryString = new URLSearchParams(router.query).toString();

  const { data, error, isLoading } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <p>Error loading books.</p>;
  if (!data || !data.docs.length)
    return <p>No books found for your search.</p>;

  const subtext = Object.keys(router.query)
    .map((key) => `${key}: ${router.query[key]}`)
    .join(", ");

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      <Row className="gy-4">
        {data.docs.map((book) => (
          <Col lg={3} md={6} key={book.key}>
            <BookCard workId={book.key.replace("/works/", "")} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between my-4">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          disabled={data.docs.length < 10} 
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
