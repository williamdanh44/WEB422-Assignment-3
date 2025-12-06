import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <strong>{text}</strong>
          {subtext && <p className="text-muted">{subtext}</p>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
