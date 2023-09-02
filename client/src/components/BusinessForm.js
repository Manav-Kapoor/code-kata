import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

function BusinessForm(props) {
  return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              props.setStateFromField("name", e.target.value);
            }}
            value={props.formData.name}
            placeholder="Enter Business Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="input-text"
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  props.setStateFromField("email", e.target.value);
                }}
                value={props.formData.email}
              />
            </Col>
            <Col>
              <Form.Label>Tax Identification Number</Form.Label>
              <Form.Control
                className="input-text"
                type="text"
                placeholder="Enter TIN"
                onChange={(e) => {
                  props.setStateFromField("taxId", e.target.value);
                }}
                value={props.formData.taxId}
              />
            </Col>
            <Col>
              <Form.Label>Year of Establishment</Form.Label>
              <Form.Control
                className="input-text"
                type="text"
                placeholder="Enter Year of Establishment"
                onChange={(e) => {
                  props.setStateFromField("yearOfEstablishment", e.target.value);
                }}
                value={props.formData.yearOfEstablishment}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Loan Amount</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  onChange={(e) => {
                    props.setStateFromField("amount", e.target.value);
                  }}
                  value={props.formData.amount}
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Accounting Provider</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  props.setStateFromField("accountingProvider", e.target.value);
                }}
                value={props.formData.accountingProvider}
              >
                <option value="Xero">Xero</option>
                <option value="MYOB">MYOB</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <div className="btn-container">
          <Button
            variant="primary"
            className="submit-btn"
            onClick={props.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
  );
}

export default BusinessForm;