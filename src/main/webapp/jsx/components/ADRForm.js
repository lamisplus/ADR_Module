import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";

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
  cardBottom: {},
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    marginBottom: 20,
    flexGrow: 1,
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
}));

function ADRForm() {
  const classes = useStyles();
  const [saving, setSaving] = useState(false);
  const [adrPayload, setAdrPayload] = useState({
    weight: "",
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="row mb-12 col-md-12" style={{ paddingBottom: "5px" }}>
          <div className="mb-6 col-md-6">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography style={{ color: "#992E62" }}>ADR</Typography>
              <Typography style={{ color: "#014d88" }}>Registration</Typography>
            </Breadcrumbs>
          </div>
          <div className="mb-6 col-md-6">
            <Link
              to={{
                pathname: "/",
                state: "",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className=" float-right ms-1"
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                startIcon={<TiArrowBack />}
              >
                <span style={{ textTransform: "capitalize" }}>Back </span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-xl-12 col-lg-12">
          <Form>
            <div className="card">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <h5
                  className="card-title"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                >
                  Basic Information
                </h5>
              </div>
              {/* basic info */}
              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="name">Name </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="dob">DOB </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="dob"
                          id="dob"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="age">Age </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="age"
                          id="age"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="sex">Sex </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="sex"
                          id="sex"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="hospitalNo">Hospital Number</Label>
                        <input
                          className="form-control"
                          type="text"
                          name="hospitalNo"
                          id="hospitalNo"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="weight">
                          Weight <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="weight"
                          id="weight"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              {/* adverse event */}
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <h5
                  className="card-title"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                >
                  Adverse Event
                </h5>
              </div>

              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <div className="form-group mb-3 col-md-12">
                      <FormGroup>
                        <Label for="event_description">
                          Describe Event <span style={{ color: "red" }}>*</span>
                        </Label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="event_description"
                          id="event_description"
                          rows={4}
                          cols={60}
                          onChange={(e) => {}}
                          style={{
                            border: "1px solid #014d88",
                            height: "80px",
                          }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Seriousness of Adverse Event (check all that apply)</h3>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input type="radio" name="death" value="death" />{" "}
                          Death
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input
                            type="radio"
                            name="life_threatening"
                            value="life_threatening"
                          />{" "}
                          Life threatening
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>Hospitalization: </label>
                        <select
                          className="form-control"
                          type="text"
                          name="outcomes"
                          id="outcomes"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="death_date">
                          Death Date <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="death_date"
                          id="death_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input
                            type="radio"
                            name="disability"
                            value="disability"
                          />{" "}
                          Disability or Permanent Damage
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input type="radio" name="anomaly" value="anomaly" />{" "}
                          Congenital Anomaly/Birth Defects
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input
                            type="radio"
                            name="intervention"
                            value="intervention"
                          />{" "}
                          Require Intervention to Permanent Impairment or
                          Disability (Devices)
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <label>
                          <input type="radio" name="others" value="others" />{" "}
                          Others
                        </label>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="event_description">
                          Describe Event <span style={{ color: "red" }}>*</span>
                        </Label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="event_description"
                          id="event_description"
                          onChange={(e) => {}}
                          style={{
                            border: "1px solid #014d88",
                          }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Outcomes <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="outcomes"
                          id="outcomes"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          Onset Date of Event{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="onset_date"
                          id="onset_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          Stop Date of Event{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="stop_date"
                          id="stop_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              {/* suspected drug */}
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <h5
                  className="card-title"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                >
                  Suspected Drug
                </h5>
              </div>

              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <h3>Product Details</h3>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Drug Type <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="drug_type"
                          id="drug_type"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Brand name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="brand_name"
                          id="brand_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Generic name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="generic_name"
                          id="generic_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Name of manufacturer{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="manufacturer_name"
                          id="manufacturer_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Address of manufacturer{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="manufacturer_address"
                          id="manufacturer_address"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Batch No <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="batch_no"
                          id="batch_no"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          NAFDAC No <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="nafdac_no"
                          id="nafdac_no"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-3">
                      <FormGroup>
                        <Label for="onset_date">
                          Expiry Date <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="expiry_date"
                          id="expiry_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Indication for use (Diagnosis)</h3>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Dosage <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="dosage"
                          id="dosage"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Frequency <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="frequency"
                          id="frequency"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Route Administration{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="administration_route"
                          id="administration_route"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          Date medication started{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_medication_started"
                          id="date_medication_started"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="date_medication_stop">
                          Date medication started{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_medication_stop"
                          id="date_medication_stop"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Reaction Stopped or Reduced after drug withdrawal{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="reaction_stopped"
                          id="reaction_stopped"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Reaction Reappeared after drug reduction{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="reaction_stopped"
                          id="reaction_stopped"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              {/* Concomitant Medicines */}
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <h5
                  className="card-title"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                >
                  Concomitant Medicines
                </h5>
              </div>

              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <h3>All medicines taken within the last 3 months</h3>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Brand or Generic name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_brand_name"
                          id="concomitant_brand_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Dosage <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_dosage"
                          id="concomitant_dosage"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Route <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_route"
                          id="concomitant_route"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          Date started <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_concomitant_started"
                          id="date_concomitant_started"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="date_concomitant_stopped">
                          Date stopped <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_concomitant_stopped"
                          id="date_concomitant_stopped"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Reason for Use <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_reason_use"
                          id="concomitant_reason_use"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Relevant Tests/Laboratory Data with Dates</h3>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Relevant Test <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="relevant_test"
                          id="relevant_test"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Test Date <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="relevant_test_date"
                          id="relevant_test_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Result <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="relevant_result"
                          id="relevant_result"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Result Date <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="relevant_result_date"
                          id="relevant_result_date"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Other Relevant History</h3>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Preexisting Medical Conditions{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="preexisting_medical_conditions"
                          id="preexisting_medical_conditions"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Codeset outcomes</option>
                        </select>
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              {/* Reporter */}
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <h5
                  className="card-title"
                  style={{ color: "#fff", fontWeight: "bolder" }}
                >
                  Reporter Section
                </h5>
              </div>

              <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          First name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="first_name"
                          id="first_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Last Name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="last_name"
                          id="last_name"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Address <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          id="address"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          City <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="city"
                          id="city"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="state">
                          State <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="state"
                          id="state"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Phone Number <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          id="phone"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Health Professional{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="preexisting_medical_conditions"
                          id="preexisting_medical_conditions"
                          style={{ border: "1px solid #014d88" }}
                          onChange={(e) => {}}
                        >
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Occupation <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          id="phone"
                          onChange={(e) => {}}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <row>
                      <Button
                        variant="contained"
                        color="primary"
                        className=" float-right ms-1"
                        style={{
                          backgroundColor: "#014d88",
                          fontWeight: "bolder",
                        }}
                        startIcon={<SaveIcon />}
                      >
                        {!saving ? (
                          <span style={{ textTransform: "capitalize" }}>
                            Save
                          </span>
                        ) : (
                          <span style={{ textTransform: "capitalize" }}>
                            Saving...
                          </span>
                        )}
                      </Button>
                    </row>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default ADRForm;
