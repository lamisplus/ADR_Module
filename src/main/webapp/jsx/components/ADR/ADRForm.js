import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import { token, url as baseUrl } from "../../../api";
import Drug from "./Drug";
import DrugMedicine from "./DrugMedicine";
import { ToastContainer, toast } from "react-toastify";
import * as moment from "moment";
import {
  validatePhoneNumber,
  checkNumberLimit,
} from "../../../utils/utilityFunctions";

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
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const styles = {
    color: "#f85032",
    fontSize: "11px",
  };
  const [relevant, setRelevant] = useState([]);
  const history = useHistory();
  const patientInfo =
    history.location && history.location.state
      ? history.location.state.patientInfo
      : {};

  //console.log(state);
  const {
    firstName,
    surname,
    dateOfBirth,
    sex,
    uuid,
    identifier,
    organization,
  } = patientInfo;

  const adrOutcomes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}application-codesets/v2/ADVERSE_EVENT_OUTCOME`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOutcomes(response.data.sort());
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
    adrRelevant();
    GetCountry();
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
    lifeThreatening: false,
    hospitalization: "",
    dateOfDeath: "",
    disability: false,
    anomaly: false,
    intervention: false,
    others: false,
    otherDescription: "",
    outcomes: "",
    onsetDate: "",
    stoppedDate: "",
    outcomesOtherDescription: "",
  });

  const [severeDrugs, setSevereDrugs] = useState({
    dosage: "",
    frequency: "",
    administrationRoute: "",
    dateMedicationStarted: "",
    dateMedicationStopped: "",
    reactionReappeared: "",
    reactionStopped: "",
  });

  const [concomitantMedicines, setConcomitantMedicines] = useState({
    preexistingMedicalConditions: "",
    preexistingMedicalOthers: "",
  });

  const [reporter, setReporter] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    healthProfessional: "",
    occupation: "",
    country: "",
    email: "",
    reportDate: "",
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

  const handleMedicineInputChange = (event) => {
    const { name, value } = event.target;
    setConcomitantMedicines({
      ...concomitantMedicines,
      [name]: value,
    });
  };

  const handleReporterInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber" && value.length > 11) {
      const acceptedNumber = checkNumberLimit(value);
      if (validatePhoneNumber(acceptedNumber) !== true) {
        toast.error("Reporter Phone number is not valid");
      } else {
        value = acceptedNumber;
      }
    }
    setReporter({
      ...reporter,
      [name]: value,
    });
  };

  const GetCountry = () => {
    axios
      .get(`${baseUrl}organisation-units/parent-organisation-units/0`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCountries(response.data);
        setStateByCountryId(response.data[0].id);
      })
      .catch((error) => {});
  };

  //Get list of State
  function setStateByCountryId(id) {
    axios
      .get(`${baseUrl}organisation-units/parent-organisation-units/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStates(response.data.sort());
      })
      .catch((error) => {});
  }

  const validateInputs = () => {
    const temp = { ...errors };
    temp.firstName = reporter.firstName ? "" : "First Name is required.";
    temp.lastName = reporter.lastName ? "" : "Last Name is required.";
    temp.address = reporter.address ? "" : "Address is required.";
    temp.city = reporter.city ? "" : "City is required.";
    temp.state = reporter.state ? "" : "State is required.";
    temp.phoneNumber = reporter.phoneNumber ? "" : "Phone Number is required.";
    temp.healthProfessional = reporter.healthProfessional
      ? ""
      : "Health Professional is required.";
    temp.occupation = reporter.occupation ? "" : "Occupation is required.";
    temp.country = reporter.country ? "" : "Country is required.";
    temp.email = reporter.email ? "" : "Email is required.";
    temp.reportDate = reporter.reportDate ? "" : "Report Date is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const submitForm = () => {
    const drugs = JSON.parse(localStorage.getItem("severeDrugs"));
    const medicines = JSON.parse(localStorage.getItem("medicine"));

    const severeDrugData = {
      drugs: drugs,
    };

    const medicationData = {
      medicines: medicines,
      preexistingMedicalConditions:
        concomitantMedicines.preexistingMedicalConditions,
      preexistingMedicalOthers: concomitantMedicines.preexistingMedicalOthers,
    };

    const adrPayload = {
      patientUuid: uuid,
      weight: bioData.weight,
      facilityId: organization?.id,
      adverseEffect: adverseEffect,
      severeDrug: severeDrugData,
      concomitantMedicines: medicationData,
      reporter: reporter,
      reportDate: reporter.reportDate,
    };

    //console.log(adrPayload);
    if (validateInputs()) {
      axios
        .post(`${baseUrl}adr/create`, adrPayload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("res", response);
          toast.success("ADR Form Filled Successfully");
          localStorage.removeItem("severeDrugs");
          localStorage.removeItem("medicine");
          history.push("/");
        })
        .catch((error) => {
          console.error(`${error.message}`);
        });
    }
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
                    <h3 className="mb-3">
                      Seriousness of Adverse Event (check all that apply)
                    </h3>
                    <div className="form-group mb-3 col-md-2">
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
                    </div>{" "}
                    {adverseEffect.death === false ? (
                      ""
                    ) : (
                      <div className="form-group mb-3 col-md-2">
                        <FormGroup>
                          <Label for="dateOfDeath">
                            Death Date <span style={{ color: "red" }}>*</span>
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="dateOfDeath"
                            id="dateOfDeath"
                            value={adverseEffect.dateOfDeath}
                            onChange={handleAdverseInputChange}
                            style={{ border: "1px solid #014d88" }}
                            min={adverseEffect.onsetDate}
                            max={moment(new Date()).format("YYYY-MM-DD")}
                          />
                        </FormGroup>
                      </div>
                    )}{" "}
                    <div className="form-group mb-3 col-md-2">
                      <FormGroup>
                        <label>
                          <input
                            type="checkbox"
                            name="lifeThreatening"
                            checked={adverseEffect.lifeThreatening}
                            onChange={handleAdverseInputChange}
                          />{" "}
                          Life threatening
                        </label>
                      </FormGroup>
                    </div>{" "}
                    <div className="form-group mb-3 col-md-2">
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
                          <option value="">--Please choose an option--</option>
                          <option value="Initial">Initial</option>
                          <option value="Prolonged">Prolonged</option>
                        </select>
                      </FormGroup>
                    </div>{" "}
                    <div className="form-group mb-3 col-md-2">
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
                    </div>{" "}
                    <div className="form-group mb-3 col-md-2">
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
                    </div>{" "}
                    <div className="form-group mb-3 col-md-2">
                      <FormGroup>
                        <label>
                          <input
                            type="checkbox"
                            name="intervention"
                            checked={adverseEffect.intervention}
                            onChange={handleAdverseInputChange}
                          />{" "}
                          Require Intervention to Permanent Impairment or
                          Disability (Devices)
                        </label>
                      </FormGroup>
                    </div>{" "}
                    <div className="form-group mb-3 col-md-2">
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
                    </div>{" "}
                    {adverseEffect.eventDescription === "" ? (
                      ""
                    ) : (
                      <div className="form-group  col-md-2">
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
                            value={adverseEffect.outcomes}
                            onChange={handleAdverseInputChange}
                          >
                            <option value="">
                              --Please choose an option--
                            </option>
                            {outcomes?.map((outcome, index) => (
                              <option key={outcome.code} value={outcome.code}>
                                {outcome.display}
                              </option>
                            ))}
                          </select>
                        </FormGroup>
                      </div>
                    )}{" "}
                    {adverseEffect.outcomes === "" ? (
                      ""
                    ) : (
                      <div className="form-group mb-3 col-md-2">
                        <FormGroup>
                          <Label for="onsetDate">
                            Onset Date of Event{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="onsetDate"
                            id="onsetDate"
                            value={adverseEffect.onsetDate}
                            onChange={handleAdverseInputChange}
                            style={{ border: "1px solid #014d88" }}
                            min={dateOfBirth}
                            max={moment(new Date()).format("YYYY-MM-DD")}
                          />
                        </FormGroup>
                      </div>
                    )}
                    {adverseEffect.onsetDate !== "" && (
                      <div className="form-group mb-3 col-md-2">
                        <FormGroup>
                          <Label for="stoppedDate">
                            Stop Date of Event{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <input
                            className="form-control"
                            type="date"
                            name="stoppedDate"
                            id="stoppedDate"
                            value={adverseEffect.stoppedDate}
                            onChange={handleAdverseInputChange}
                            style={{ border: "1px solid #014d88" }}
                            min={adverseEffect.onsetDate}
                          />
                        </FormGroup>
                      </div>
                    )}
                    {/* <row> */}{" "}
                    {adverseEffect.others === false ? (
                      " "
                    ) : (
                      <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                          <Label for="otherDescription">
                            Others Description{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="otherDescription"
                            id="otherDescription"
                            value={adverseEffect.otherDescription}
                            onChange={handleAdverseInputChange}
                            style={{
                              border: "1px solid #014d88",
                            }}
                          />
                        </FormGroup>
                      </div>
                    )}{" "}
                    {adverseEffect.outcomes ===
                    "ADVERSE_EVENT_OUTCOME_OTHERS_(SPECIFY)" ? (
                      <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                          <Label for="outcomesOtherDescription">
                            Outcomes Others Description{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="outcomesOtherDescription"
                            id="outcomesOtherDescription"
                            value={adverseEffect.outcomesOtherDescription}
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
                    {/* </row> */}
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
                    <Drug adverseEffect={adverseEffect} />
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

                    <DrugMedicine />

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
                          name="preexistingMedicalConditions"
                          id="preexistingMedicalConditions"
                          style={{ border: "1px solid #014d88" }}
                          value={
                            concomitantMedicines.preexistingMedicalConditions
                          }
                          onChange={handleMedicineInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          {relevant.map((outcome, index) => (
                            <option key={outcome.code} value={outcome.code}>
                              {outcome.display}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>
                    {concomitantMedicines.preexistingMedicalConditions !==
                    "ADR_PREEXISTING_MEDICAL_CONDITIONS_OTHERS_(SPECIFY)" ? (
                      ""
                    ) : (
                      <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="preexistingMedicalOthers">
                            Preexisting Medical Other Description{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <textarea
                            className="form-control"
                            type="text"
                            name="preexistingMedicalOthers"
                            id="preexistingMedicalOthers"
                            value={adverseEffect.preexistingMedicalOthers}
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
                          name="firstName"
                          id="firstName"
                          value={reporter.firstName}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                        {errors.firstName !== "" ? (
                          <span style={styles}>{errors.firstName}</span>
                        ) : (
                          ""
                        )}
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
                          name="lastName"
                          id="lastName"
                          value={reporter.lastName}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
                        {errors.lastName !== "" ? (
                          <span style={styles}>{errors.lastName}</span>
                        ) : (
                          ""
                        )}
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
                        {errors.address !== "" ? (
                          <span style={styles}>{errors.address}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="country">
                          Country <span style={{ color: "red" }}>*</span>
                        </Label>

                        <select
                          className="form-control"
                          type="text"
                          name="country"
                          id="country"
                          style={{ border: "1px solid #014d88" }}
                          value={reporter.country}
                          onChange={handleReporterInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          {countries.map((value, index) => (
                            <option key={index} value={value.name}>
                              {value.name}
                            </option>
                          ))}
                        </select>

                        {/* <input
                          className="form-control"
                          type="text"
                          name="country"
                          id="country"
                          value={reporter.country}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        /> */}
                        {errors.country !== "" ? (
                          <span style={styles}>{errors.country}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="state">
                          State <span style={{ color: "red" }}>*</span>
                        </Label>
                        <select
                          className="form-control"
                          type="text"
                          name="state"
                          id="state"
                          value={reporter.state}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                          onChange={handleReporterInputChange}
                        >
                          <option value="">Select</option>
                          {states.map((value, index) => (
                            <option key={index} value={value.name}>
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {/* <input
                          className="form-control"
                          type="text"
                          name="state"
                          id="state"
                          value={reporter.state}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                        /> */}
                        {errors.state !== "" ? (
                          <span style={styles}>{errors.state}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                        <Label for="">
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
                        {errors.city !== "" ? (
                          <span style={styles}>{errors.city}</span>
                        ) : (
                          ""
                        )}
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
                          name="phoneNumber"
                          id="phoneNumber"
                          value={reporter.phoneNumber}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                          pattern="[0-9]{9}"
                          title="Please enter valid phone number"
                        />
                        {errors.phoneNumber !== "" ? (
                          <span style={styles}>{errors.phoneNumber}</span>
                        ) : (
                          ""
                        )}
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
                        {errors.email !== "" ? (
                          <span style={styles}>{errors.email}</span>
                        ) : (
                          ""
                        )}
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
                          name="healthProfessional"
                          id="healthProfessional"
                          style={{ border: "1px solid #014d88" }}
                          value={reporter.healthProfessional}
                          onChange={handleReporterInputChange}
                        >
                          <option value="">--Please choose an option--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.healthProfessional !== "" ? (
                          <span style={styles}>
                            {errors.healthProfessional}
                          </span>
                        ) : (
                          ""
                        )}
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
                        {errors.occupation !== "" ? (
                          <span style={styles}>{errors.occupation}</span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                      <FormGroup>
                        <Label>
                          Report Date <span style={{ color: "red" }}>*</span>
                        </Label>
                        <input
                          className="form-control"
                          type="date"
                          name="reportDate"
                          id="reportDate"
                          value={reporter.reportDate}
                          onChange={handleReporterInputChange}
                          style={{ border: "1px solid #014d88" }}
                          max={moment(new Date()).format("YYYY-MM-DD")}
                        />
                        {errors.reportDate !== "" ? (
                          <span style={styles}>{errors.reportDate}</span>
                        ) : (
                          ""
                        )}
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
