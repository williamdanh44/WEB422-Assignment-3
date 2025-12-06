import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import { Row, Col } from "react-bootstrap";
import BookCard from "@/components/BookCard";
import { useEffect } from "react";
import { getFavourites } from "@/lib/userData";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    async function fetchFavourites() {
      const favs = await getFavourites();
      setFavouritesList(favs);
    }
    fetchFavourites();
  }, [setFavouritesList]);

  if (!favouritesList) return null; // Wait until API call completes

  return (
    <>
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Favourites" subtext="Your Favourite Books" />
          <Row className="gy-4">
            {favouritesList.map(workId => (
              <Col lg={3} md={6} key={workId}>
                <BookCard workId={workId} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <PageHeader text="Nothing Here" subtext="Add a book to your favourites" />
      )}
    </>
  );
}
