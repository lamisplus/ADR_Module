import React, { useState, forwardRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  ProgressBar,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import MaterialTable from "material-table";
import axios from "axios";
import { token as token, url as baseUrl } from "./../../api";
import { toast } from "react-toastify";
import Login from "./Login";
import LoginList from "./LoginList";

import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

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

import { Badge } from "reactstrap";
// import DownloadIcon from "@mui/icons-material/Download";
// import UploadIcon from "@mui/icons-material/Upload";

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

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [upload, setUpload] = useState([]);
  const [dhis2List, setDhis2List] = useState([]);

  const getAllUploads = () => {
    axios
      .get(`${baseUrl}v1/dhis2/dhis2-uploads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpload(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getList = () => {
    axios
      .get(`${baseUrl}v1/configuration/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDhis2List(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLogin = (id) => {
    axios
      .delete(`${baseUrl}v1/configuration/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Login credentials deleted successfully");
        getList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUploads();
    getList();
  }, []);

  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
  };

  const calculateCurrentDate = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const jsonData = JSON.parse(fileReader.result);
      await axios
        .post(`${baseUrl}v1/dhis2/push-data`, JSON.stringify(jsonData), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        })
        .then((resp) => {
          document.getElementById("fileInput").value = "";
          setFile(null);

          setUploadProgress(0);
          let upload = null;
          if (resp.data) {
            upload = {
              filename: fileName,
              uploadDate: calculateCurrentDate(),
              status: "Upload Successful",
            };
            toast.success(`DHIS2 Data ${resp.data.message}`);
          } else {
            upload = {
              filename: fileName,
              uploadDate: calculateCurrentDate(),
              status: "Upload Failed",
            };
          }

          axios
            .post(`${baseUrl}v1/dhis2/dhis2-status-uploads`, upload, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              getAllUploads();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          setUploadProgress(0);
          toast.error(err.message);
        });
    };
    fileReader.readAsText(file);
  };

  return (
    <>
      <Container fluid>
        <Card className="mt-4">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/">DHIS2</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Card.Title className="m-2">
            LAMISPlus DHIS2 Data Exchange Module
          </Card.Title> */}

          <Card.Body>
            <Row>
              <Col>
                {dhis2List.length <= 0 ? (
                  <>
                    <Card.Text className="m-2">
                      Kindly Provide Dhis2 Login Credentials
                    </Card.Text>
                    <Login dhis2List={getList} />
                  </>
                ) : (
                  <>
                    <Card.Text className="m-2">
                      DHIS2 Login Credentials
                    </Card.Text>
                    <LoginList
                      dhis2List={dhis2List}
                      deleteLogin={deleteLogin}
                    />
                  </>
                )}
              </Col>
              {dhis2List.length > 0 ? (
                <Col>
                  <ProgressBar animated now={uploadProgress} />
                  <br />
                  <Row className="align-items-center">
                    <Col sm={6} className="my-1">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <b>Upload Aggregate Data</b>
                        </Form.Label>
                        <Form.Control
                          placeholder="Dhis2 json file upload"
                          type="file"
                          onChange={handleFileChange}
                          id="fileInput"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6} className="my-1">
                      <Button variant="primary" onClick={handleUpload}>
                        Upload{" "}
                        <span
                          className="fa fa-cloud-upload"
                          aria-hidden="true"
                        ></span>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
            <Row>
              <Col>
                <br />
                <MaterialTable
                  icons={tableIcons}
                  title="Uploads to DHIS2 "
                  columns={[
                    { title: "File Name", field: "name" },
                    {
                      title: "Date of Upload",
                      field: "date",
                    },
                    { title: "Status", field: "status" },
                  ]}
                  data={upload.map((row) => ({
                    name: row.filename,
                    date: row.uploadDate,
                    status: (
                      <Badge
                        color={
                          row.status !== "Upload Successful" ? `danger` : `info`
                        }
                      >
                        {row.status}
                      </Badge>
                    ),
                  }))}
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

export default Home;
