import { Container } from "react-bootstrap";
import MainNav from "./MainNav";

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Container>
        {children}
      </Container>
    </>
  );
}
