import React, { useState, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MaterialTable from "material-table";
import axios from "axios";
import { token as token, url as baseUrl } from "../../api";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const AList = (props) => {
  const [upload, setUpload] = useState([]);
  const [permissions, setPermissions] = useState(props.permissions);

  useEffect(() => {
    localStorage.removeItem("severeDrugs");
    localStorage.removeItem("medicine");
  }, []);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      ageYears <= 0 &&
      monthDifference < 0 &&
      today.getDate() < birthDate.getDate()
    ) {
      ageYears--;
    }

    if (ageYears === 0) {
      return monthDifference === 0
        ? "Less than a month"
        : `${monthDifference} month(s)`;
    }

    return ageYears === 1 ? "1 year" : `${ageYears} years`;
  };

  const getHospitalNumber = (identifier) => {
    const hospitalNumber = identifier.identifier.find(
      (obj) => obj.type == "HospitalNumber"
    );
    return hospitalNumber ? hospitalNumber.value : "";
  };

  const handleRemoteData = (query) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}adr/get_all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response)
        .then((result) => {
          if (result.data === "") {
            resolve({
              data: [],
              page: 0,
              totalCount: 0,
            });
          } else {
            resolve({
              data: result.data.details.map((row) => ({
                name: "",
                id: "",
                sex: "",
                dateOfBirth: "",
                age: "",
                actions: (
                  <div>
                    <Link to="/edit-adr-form" state={{ patientInfo: row }}>
                      <Button className="btn btn-info">Edit Form</Button>
                    </Link>
                  </div>
                ),
              })),
              page: query.page,
              totalCount: result.data.totalRecords,
            });
          }
        });
    });

  return (
    <>
      <Container fluid>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <Col>
                <br />
                <MaterialTable
                  icons={tableIcons}
                  title="Filled ADR Forms"
                  columns={[
                    {
                      title: "Name",
                      field: "name",
                      filtering: false,
                      //hidden: enablePPI,
                    },
                    { title: "Hosp. Number", field: "id", filtering: false },
                    { title: "Sex", field: "sex", filtering: false },
                    {
                      title: "Date Of Birth",
                      field: "dateOfBirth",
                      filtering: false,
                    },
                    { title: "Age", field: "age", filtering: false },
                    /*{ title: "Address", field: "address", filtering: false },*/
                    /*{ title: "Status", field: "status", filtering: false },*/
                    { title: "Actions", field: "actions", filtering: false },
                  ]}
                  data={handleRemoteData}
                  options={{
                    headerStyle: {
                      backgroundColor: "#014d88",
                      color: "#fff",
                    },
                    searchFieldStyle: {
                      width: "200%",
                      margingLeft: "250px",
                    },
                    filtering: false,
                    exportButton: false,
                    searchFieldAlignment: "left",
                    pageSizeOptions: [10, 20, 100],
                    pageSize: 10,
                    debounceInterval: 400,
                  }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AList;
