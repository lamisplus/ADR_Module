import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { token, url as baseUrl } from "../../api";
import { Tab } from "semantic-ui-react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ClientList from "./ClientList";
import ADRList from "./ADRList";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& a": {
      textDecoration: "none !important",
    },
  },
  input: {
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));
function Home(props) {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState("");
  const [modal, setModal] = useState(false);
  const [patient, setPatient] = useState(false);

  const [enablePPI, setEnablePPI] = useState(true);
  const [modalRecall, setModalRecall] = useState(false);

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
  const enablePPIColumns = () => {
    setEnablePPI(!enablePPI);
  };
  const panes = [
    {
      menuItem: "Clients",
      render: () => (
        <Tab.Pane>
          <ClientList permissions={permissions} />
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: "ADR",
    //   render: () => (
    //     <Tab.Pane>
    //       <ADRList permissions={permissions} />
    //     </Tab.Pane>
    //   ),
    // },
  ];

  return (
    <>
      <div className={classes.root}>
        <ToastContainer autoClose={3000} hideProgressBar />
        {permissions.length > 0 && (
          <Card>
            <CardBody>
              <div className="row mb-12 col-md-12">
                <div className="mb-6 col-md-6">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Typography style={{ color: "#992E62" }}>ADR</Typography>
                    <Typography style={{ color: "#014d88" }}>Home</Typography>
                  </Breadcrumbs>
                </div>
              </div>
              <br />

              <Tab panes={panes} />
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}

export default Home;
