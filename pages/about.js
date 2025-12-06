import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";
import { Card } from "react-bootstrap";

export default function About({ book }) {
  return (
    <>
      <br/>
      <PageHeader text="About the Developer - William Danh" />

      <Card className="bg-light mb-3">
        <Card.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra, lectus eu aliquam ornare, ante lorem euismod nulla, a efficitur ante urna id nunc.
          </p>
        </Card.Body>
      </Card>

      <BookDetails book={book} workId={book.key.replace("/works/", "")} showFavouriteBtn={false} />
    </>
  );
}

export async function getStaticProps() {
  const workId = "OL453657W";
  const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
  const data = await res.json();

  return {
    props: { book: data },
  };
}
