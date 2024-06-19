import React, { useState, Fragment,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { token, url as baseUrl } from "../../api";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClientList from "./ADR/ClientList";
import ADRList from "./ADR/ADRList";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = () => {
  const [key, setKey] = useState("home");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
      userPermission();
    }, []);

  const userPermission = () => {
      axios
        .get(`${baseUrl}account`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPermissions(response.data.permissions);
        })
        .catch((error) => {});
    };

  return (
    <Fragment>
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h4>ADR</h4>
          </li>
        </ol>
      </div>
      <br />
      <Row>
        <Col xl={12}>
          <Card style={divStyle}>
            <Card.Body>
              <div className="custom-tab-1">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Patients">
                    <ClientList permissions={permissions}/>
                  </Tab>
                  /*
                  <Tab eventKey="hts" title="ADR Patients">
                    <ADRList />
                  </Tab>
                  */
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
