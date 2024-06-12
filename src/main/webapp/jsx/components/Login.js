import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { token as token, url as baseUrl } from "./../../api";

const Login = ({ dhis2List }) => {
  const [formData, setFormData] = useState({
    url: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = () => {
    axios
      .post(`${baseUrl}v1/configuration/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFormData({
            url: "",
            username: "",
            password: "",
          });
        }
        dhis2List();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form>
        <Row>
          <Col sm={4}>
            <Form.Control
              placeholder="Dhis2 Url"
              name="url"
              onChange={handleChange}
              value={formData.url}
              required
            />
          </Col>
          <Col sm={4}>
            <Form.Control
              placeholder="Dhis2 Username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </Col>
          <Col sm={4}>
            <Form.Control
              placeholder="Dhis2 Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </Col>
          <Col>
            <br />
            <Button variant="primary" onClick={submitForm}>
              Submit <span className="fa fa-save" aria-hidden="true"></span>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
