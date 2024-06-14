import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import { token, url as baseUrl } from "../../api";

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
  const [outcomes, setOutcomes] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [relevant, setRelevant] = useState([]);
  let { state } = useLocation();
  const history = useNavigate();
  //console.log(state);
  const {
    firstName,
    surname,
    dateOfBirth,
    sex,
    uuid,
    identifier,
    organization,
  } = state?.patientInfo;

  const adrOutcomes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}application-codesets/v2/ADVERSE_EVENT_OUTCOME`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOutcomes(response.data.sort());
    } catch (e) {}
  }, []);

  const adrDrugs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}application-codesets/v2/ADR_DRUG_TYPE`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDrugs(response.data.sort());
    } catch (e) {}
  }, []);
  const adrRelevant = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}application-codesets/v2/ADR_PREEXISTING_MEDICAL_CONDITIONS`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRelevant(response.data.sort());
    } catch (e) {}
  }, []);

  useEffect(() => {
    adrOutcomes();
    adrDrugs();
    adrRelevant();
  }, []);

  const calculate_age = (dob) => {
    const today = new Date();
    const dateParts = dob.split("-");
    const birthDate = new Date(dob);
    let age_now = today.getFullYear() - birthDate.getFullYear();

    return age_now;
  };

  const [bioData, setBioData] = useState({
    weight: "",
  });

  const [adverseEffect, setAdverseEffect] = useState({
    eventDescription: "",
    death: false,
    life_threatening: false,
    hospitalization: "",
    death_date: "",
    disability: false,
    anomaly: false,
    intervention: false,
    others: false,
    others_description: "",
    outcomes: "",
    onset_date: "",
    stop_date: "",
  });

  const [severeDrugs, setSevereDrugs] = useState({
    drug_type: "",
    brand_name: "",
    generic_name: "",
    manufacturer_name: "",
    manufacturer_address: "",
    batch_no: "",
    nafdac_no: "",
    expiry_date: "",
    dosage: "",
    frequency: "",
    administration_route: "",
    date_medication_started: "",
    date_medication_stop: "",
    reaction_stopped: "",
    reaction_reappeared: "",
  });

  const [concomitantMedicines, setConcomitantMedicines] = useState({
    concomitant_brand_name: "",
    concomitant_dosage: "",
    concomitant_route: "",
    date_concomitant_started: "",
    date_concomitant_stopped: "",
    concomitant_reason_use: "",
    relevant_test: "",
    relevant_test_date: "",
    relevant_result: "",
    relevant_result_date: "",
    preexisting_medical_conditions: "",
    preexisting_medical_others: "",
  });

  const [reporter, setReporter] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    health_professional: "",
    occupation: "",
    country: "",
    email: "",
  });

  const handleBioInputChange = (event) => {
    const { name, value } = event.target;
    setBioData({
      ...bioData,
      [name]: value,
    });
  };

  const handleAdverseInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAdverseEffect({
      ...adverseEffect,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSevereInputChange = (event) => {
    const { name, value } = event.target;
    setSevereDrugs({
      ...severeDrugs,
      [name]: value,
    });
  };

  const handleMedicineInputChange = (event) => {
    const { name, value } = event.target;
    setConcomitantMedicines({
      ...concomitantMedicines,
      [name]: value,
    });
  };

  const handleReporterInputChange = (event) => {
    const { name, value } = event.target;
    setReporter({
      ...reporter,
      [name]: value,
    });
  };

  const submitForm = () => {
    const adrPayload = {
      patientUUID: uuid,
      weight: bioData.weight,
      facilityId: organization?.id,
      adverseEffect: adverseEffect,
      severeDrugs: severeDrugs,
      concomitantMedicines: concomitantMedicines,
      reporter: reporter,
    };

    console.log(adrPayload);
    history("/");
  };

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
                          value={`${firstName} ${surname}`}
                          style={{ border: "1px solid #014d88" }}
                          readOnly
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
                          value={dateOfBirth}
                          style={{ border: "1px solid #014d88" }}
                          readOnly
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
                          value={calculate_age(dateOfBirth)}
                          style={{ border: "1px solid #014d88" }}
                          readOnly
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
                          value={sex}
                          style={{ border: "1px solid #014d88" }}
                          readOnly
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
                          value={identifier.identifier[0].value}
                          style={{ border: "1px solid #014d88" }}
                          readOnly
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
                          type="number"
                          name="weight"
                          id="weight"
                          onChange={handleBioInputChange}
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
                        <Label for="eventDescription">
                          Describe Event <span style={{ color: "red" }}>*</span>
                        </Label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="eventDescription"
                          id="eventDescription"
                          value={adverseEffect.eventDescription}
                          rows={4}
                          cols={60}
                          onChange={handleAdverseInputChange}
                          style={{
                            border: "1px solid #014d88",
                            height: "80px",
                          }}
                        />
                      </FormGroup>
                    </div>

                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <h3>Seriousness of Adverse Event</h3>
                          </td>
                          <td>
                            <h3>Outcomes (check all that apply)</h3>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="death"
                                    checked={adverseEffect.death}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Death
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            {adverseEffect.eventDescription === "" ? (
                              ""
                            ) : (
                              <div className="form-group  col-md-6">
                                <FormGroup>
                                  <Label>
                                    Outcomes{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <select
                                    className="form-control"
                                    type="text"
                                    name="outcomes"
                                    id="outcomes"
                                    style={{ border: "1px solid #014d88" }}
                                    value={adverseEffect.outcomes}
                                    onChange={handleAdverseInputChange}
                                  >
                                    <option value="">
                                      --Please choose an option--
                                    </option>
                                    {outcomes?.map((outcome, index) => (
                                      <option
                                        key={outcome.id}
                                        value={outcome.id}
                                      >
                                        {outcome.display}
                                      </option>
                                    ))}
                                  </select>
                                </FormGroup>
                              </div>
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="life_threatening"
                                    checked={adverseEffect.life_threatening}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Life threatening
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            {adverseEffect.outcomes === "1616" ? (
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                  <Label for="outcomes_others_description">
                                    Outcomes Others Description{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    name="outcomes_others_description"
                                    id="outcomes_others_description"
                                    value={
                                      adverseEffect.outcomes_others_description
                                    }
                                    onChange={handleAdverseInputChange}
                                    style={{
                                      border: "1px solid #014d88",
                                    }}
                                  />
                                </FormGroup>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>Hospitalization: </label>
                                <select
                                  className="form-control"
                                  type="text"
                                  name="hospitalization"
                                  id="hospitalization"
                                  value={adverseEffect.hospitalization}
                                  style={{ border: "1px solid #014d88" }}
                                  onChange={handleAdverseInputChange}
                                >
                                  <option value="">
                                    --Please choose an option--
                                  </option>
                                  <option value="Initial">Initial</option>
                                  <option value="Prolonged">Prolonged</option>
                                </select>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {adverseEffect.outcomes === "" ? (
                              ""
                            ) : (
                              <div className="form-group mb-3 col-md-6">
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
                                    value={adverseEffect.onset_date}
                                    onChange={handleAdverseInputChange}
                                    style={{ border: "1px solid #014d88" }}
                                  />
                                </FormGroup>
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="disability"
                                    checked={adverseEffect.disability}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Disability or Permanent Damage
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <Label for="stop_date">
                                  Stop Date of Event{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Label>
                                <input
                                  className="form-control"
                                  type="date"
                                  name="stop_date"
                                  id="stop_date"
                                  value={adverseEffect.stop_date}
                                  onChange={handleAdverseInputChange}
                                  style={{ border: "1px solid #014d88" }}
                                />
                              </FormGroup>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="anomaly"
                                    checked={adverseEffect.anomaly}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Congenital Anomaly/Birth Defects
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="intervention"
                                    checked={adverseEffect.intervention}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Require Intervention to Permanent Impairment
                                  or Disability (Devices)
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
                              <FormGroup>
                                <label>
                                  <input
                                    type="checkbox"
                                    name="others"
                                    checked={handleAdverseInputChange.others}
                                    onChange={handleAdverseInputChange}
                                  />{" "}
                                  Others
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            {adverseEffect.others === false ? (
                              " "
                            ) : (
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                  <Label for="others_description">
                                    Others Description{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    name="others_description"
                                    id="others_description"
                                    value={adverseEffect.others_description}
                                    onChange={handleAdverseInputChange}
                                    style={{
                                      border: "1px solid #014d88",
                                    }}
                                  />
                                </FormGroup>
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {" "}
                            {adverseEffect.death === false ? (
                              ""
                            ) : (
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                  <Label for="death_date">
                                    Death Date{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="death_date"
                                    id="death_date"
                                    value={adverseEffect.death_date}
                                    onChange={handleAdverseInputChange}
                                    style={{ border: "1px solid #014d88" }}
                                  />
                                </FormGroup>
                              </div>
                            )}
                          </td>
                          <td></td>
                        </tr>
                        {/* <tr>
                          <td>Mark</td>
                          <td>Otto</td>
                        </tr> */}
                      </tbody>
                    </table>
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
                          value={severeDrugs.drug_type}
                          onChange={handleSevereInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          {drugs.map((drug, index) => (
                            <option key={drug.id} value={drug.id}>
                              {drug.display}
                            </option>
                          ))}
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
                          value={severeDrugs.brand_name}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.generic_name}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.manufacturer_name}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.manufacturer_address}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.batch_no}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.nafdac_no}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.expiry_date}
                          onChange={handleSevereInputChange}
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
                          type="number"
                          name="dosage"
                          id="ç"
                          value={severeDrugs.dosage}
                          onChange={handleSevereInputChange}
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
                          type="number"
                          name="frequency"
                          id="frequency"
                          value={severeDrugs.frequency}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.administration_route}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.date_medication_started}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.date_medication_stop}
                          onChange={handleSevereInputChange}
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
                          value={severeDrugs.reaction_stopped}
                          onChange={handleSevereInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Doesn't Apply">Doesn't Apply</option>
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
                          name="reaction_reappeared"
                          id="reaction_reappeared"
                          style={{ border: "1px solid #014d88" }}
                          value={severeDrugs.reaction_reappeared}
                          onChange={handleSevereInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="Doesn't Apply">Doesn't Apply</option>
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
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_brand_name"
                          id="concomitant_brand_name"
                          value={concomitantMedicines.concomitant_brand_name}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Dosage
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_dosage"
                          id="concomitant_dosage"
                          value={concomitantMedicines.concomitant_dosage}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Route
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_route"
                          id="concomitant_route"
                          value={concomitantMedicines.concomitant_route}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="onset_date">
                          Date started
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_concomitant_started"
                          id="date_concomitant_started"
                          value={concomitantMedicines.date_concomitant_started}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="date_concomitant_stopped">
                          Date stopped
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="date_concomitant_stopped"
                          id="date_concomitant_stopped"
                          value={concomitantMedicines.date_concomitant_stopped}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Reason for Use
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="concomitant_reason_use"
                          id="concomitant_reason_use"
                          value={concomitantMedicines.concomitant_reason_use}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Relevant Tests/Laboratory Data with Dates</h3>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Relevant Test
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="relevant_test"
                          id="relevant_test"
                          value={concomitantMedicines.relevant_test}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Test Date
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="relevant_test_date"
                          id="relevant_test_date"
                          value={concomitantMedicines.relevant_test_date}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Result
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="number"
                          name="relevant_result"
                          id="relevant_result"
                          value={concomitantMedicines.relevant_result}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-3">
                      <FormGroup>
                        <Label>
                          Result Date
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="relevant_result_date"
                          id="relevant_result_date"
                          value={concomitantMedicines.relevant_result_date}
                          onChange={handleMedicineInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <h3>Other Relevant History</h3>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Preexisting Medical Conditions{" "}
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="preexisting_medical_conditions"
                          id="preexisting_medical_conditions"
                          style={{ border: "1px solid #014d88" }}
                          value={
                            concomitantMedicines.preexisting_medical_conditions
                          }
                          onChange={handleMedicineInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          {relevant.map((outcome, index) => (
                            <option key={outcome.id} value={outcome.id}>
                              {outcome.display}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>
                    {concomitantMedicines.preexisting_medical_conditions !==
                    "1625" ? (
                      ""
                    ) : (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="preexisting_medical_others">
                            Preexisting Medical Other Description{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="preexisting_medical_others"
                            id="preexisting_medical_others"
                            value={adverseEffect.preexisting_medical_others}
                            onChange={handleMedicineInputChange}
                            style={{
                              border: "1px solid #014d88",
                            }}
                          />
                        </FormGroup>
                      </div>
                    )}
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
                          value={reporter.first_name}
                          onChange={handleReporterInputChange}
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
                          value={reporter.last_name}
                          onChange={handleReporterInputChange}
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
                          value={reporter.address}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="country">
                          Country <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="text"
                          name="country"
                          id="country"
                          value={reporter.country}
                          onChange={handleReporterInputChange}
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
                          value={reporter.city}
                          onChange={handleReporterInputChange}
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
                          value={reporter.state}
                          onChange={handleReporterInputChange}
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
                          type="number"
                          name="phone"
                          id="phone"
                          value={reporter.phone}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Email <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          id="email"
                          value={reporter.email}
                          onChange={handleReporterInputChange}
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
                          name="health_professional"
                          id="health_professional"
                          style={{ border: "1px solid #014d88" }}
                          value={reporter.health_professional}
                          onChange={handleReporterInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
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
                          name="occupation"
                          id="occupation"
                          value={reporter.occupation}
                          onChange={handleReporterInputChange}
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
                        onClick={submitForm}
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
