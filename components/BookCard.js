import useSWR from "swr";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt={data?.title || "Book cover"}
        onError={(e) => e.target.src = "https://placehold.co/200x300?text=Cover+Not+Available"}
      />
      <Card.Body>
        <Card.Title>{data?.title || ""}</Card.Title>
        <Card.Text>{data?.first_publish_date || "N/A"}</Card.Text>
        <Link href={`/works/${workId}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}
