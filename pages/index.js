/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: William Danh Student ID: 182291237 Date: 12/5/2025
*
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/
import PageHeader from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    router.push({
      pathname: '/books',
      query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
    });
  };

  return (
    <>
      <PageHeader text="Search for Books" subtext="Use the form below to search by author, title, subject, etc." />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                {...register("author", { required: true })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && <div className="invalid-feedback">Author is required</div>}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" {...register("title")} />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject keyword" {...register("subject")} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control type="text" maxLength={3} placeholder="e.g. eng" {...register("language")} />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control type="number" placeholder="Enter year" {...register("first_publish_year")} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100 py-3 fs-5">
          Search
        </Button>
      </Form>
    </>
  );
}
