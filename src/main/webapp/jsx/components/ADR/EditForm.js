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

function EditForm() {
  const classes = useStyles();
  const [saving, setSaving] = useState(false);
  const [adr, setAdr] = useState({
    weight: "",
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
    dosage: "",
    frequency: "",
    administrationRoute: "",
    dateMedicationStarted: "",
    dateMedicationStopped: "",
    reactionReappeared: "",
    reactionStopped: "",
    relevantTest: "",
    relevantTestDate: "",
    relevantResult: "",
    relevantResultDate: "",
    preexistingMedicalConditions: "",
    preexistingMedicalOthers: "",
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

  const [outcomes, setOutcomes] = useState([]);
  const [relevant, setRelevant] = useState([]);

  const history = useHistory();
  const patientInfo =
    history.location && history.location.state
      ? history.location.state.patientInfo
      : {};

  const { firstName, surname, dob, sex, hospitalNumber, patientUuid } =
    patientInfo;

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

  const getADRbyId = async () => {
    const response = await axios
      .get(`${baseUrl}adr/${patientUuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data.details;
        console.log(data);

        setAdr({
          weight: data?.weight,
          eventDescription: data?.adverseEffect?.eventDescription,
          death: data?.adverseEffect?.death,
          lifeThreatening: data?.adverseEffect?.lifeThreatening,
          hospitalization: data?.adverseEffect?.hospitalization,
          dateOfDeath: data?.adverseEffect?.dateOfDeath,
          disability: data?.adverseEffect?.disability,
          anomaly: data?.adverseEffect?.anomaly,
          intervention: data?.adverseEffect?.intervention,
          others: data?.adverseEffect?.others,
          otherDescription: data?.adverseEffect?.otherDescription,
          outcomes: data?.adverseEffect?.outcomes,
          onsetDate: data?.adverseEffect?.onsetDate,
          stoppedDate: data?.adverseEffect?.stoppedDate,
          outcomesOtherDescription:
            data?.adverseEffect?.outcomesOtherDescription,
          drugs: data?.severeDrugs?.drugs,
          dosage: data?.severeDrugs?.dosage,
          frequency: data?.severeDrugs?.frequency,
          administrationRoute: data?.severeDrugs?.administrationRoute,
          dateMedicationStarted: data?.severeDrugs?.dateMedicationStarted,
          dateMedicationStopped: data?.severeDrugs?.dateMedicationStopped,
          reactionReappeared: data?.severeDrugs?.reactionReappeared,
          reactionStopped: data?.severeDrugs?.reactionStopped,
          relevantTest: data?.concomitantMedicines?.relevantTest,
          relevantTestDate: data?.concomitantMedicines?.relevantTestDate,
          medicines: data?.concomitantMedicines?.medicines,
          relevantResult: data?.concomitantMedicines?.relevantResult,
          relevantResultDate: data?.concomitantMedicines?.relevantResultDate,
          preexistingMedicalConditions:
            data?.concomitantMedicines?.preexistingMedicalConditions,
          preexistingMedicalOthers:
            data?.concomitantMedicines?.preexistingMedicalOthers,
          firstName: data?.reporter?.firstName,
          lastName: data?.reporter?.lastName,
          address: data?.reporter?.address,
          city: data?.reporter?.city,
          state: data?.reporter?.state,
          phoneNumber: data?.reporter?.phoneNumber,
          healthProfessional: data?.reporter?.healthProfessional,
          occupation: data?.reporter?.occupation,
          country: data?.reporter?.country,
          email: data?.reporter?.email,
          reportDate: data?.reportDate,
        });
      });
  };

  useEffect(() => {
    getADRbyId();
    adrOutcomes();
    adrRelevant();
  }, []);

  const calculate_age = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age_now = today.getFullYear() - birthDate.getFullYear();

    return age_now;
  };

  const handleBioInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAdr({
      ...adr,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitForm = () => {
    const payload = {
      adverseEffect: {
        anomaly: adr.anomaly,
        dateOfDeath: adr.dateOfDeath,
        death: adr.death,
        disability: adr.disability,
        eventDescription: adr.eventDescription,
        hospitalization: adr.hospitalization,
        intervention: adr.intervention,
        lifeThreatening: adr.lifeThreatening,
        onsetDate: adr.onsetDate,
        otherDescription: adr.otherDescription,
        others: adr.others,
        outcomes: adr.outcomes,
        outcomesOtherDescription: adr.outcomesOtherDescription,
        stoppedDate: adr.stoppedDate,
      },
      concomitantMedicines: {
        medicines: adr.medicines,
        preexistingMedicalConditions: adr.preexistingMedicalConditions,
        preexistingMedicalOthers: adr.preexistingMedicalOthers,
      },
      patientUuid: patientUuid,
      reporter: {
        address: adr.address,
        city: adr.city,
        country: adr.country,
        email: adr.email,
        firstName: adr.firstName,
        healthProfessional: adr.healthProfessional,
        lastName: adr.lastName,
        occupation: adr.occupation,
        phoneNumber: adr.phoneNumber,
        state: adr.state,
      },
      severeDrug: {
        drugs: adr.drugs,
      },
      weight: adr.weight,
      reportDate: adr.reportDate,
    };

    console.log(payload);
    axios
      .put(`${baseUrl}adr/update/${patientUuid}`, payload, {
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
        toast.success("ADR Form Updated Successfully");
        history.push("/");
      });
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
                          value={dob}
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
                          value={calculate_age(dob)}
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
                          value={hospitalNumber}
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
                          value={adr.weight}
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
                          value={adr.eventDescription}
                          rows={4}
                          cols={60}
                          onChange={handleBioInputChange}
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
                                    checked={adr.death}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Death
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          {" "}
                          {adr.death === false ? (
                            ""
                          ) : (
                            <td>
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                  <Label for="dateOfDeath">
                                    Death Date{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </Label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="dateOfDeath"
                                    id="dateOfDeath"
                                    value={adr.dateOfDeath}
                                    onChange={handleBioInputChange}
                                    style={{ border: "1px solid #014d88" }}
                                  />
                                </FormGroup>
                              </div>
                            </td>
                          )}
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
                                    name="lifeThreatening"
                                    checked={adr.lifeThreatening}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Life threatening
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
                                <label>Hospitalization: </label>
                                <select
                                  className="form-control"
                                  type="text"
                                  name="hospitalization"
                                  id="hospitalization"
                                  value={adr.hospitalization}
                                  style={{ border: "1px solid #014d88" }}
                                  onChange={handleBioInputChange}
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
                                    name="disability"
                                    checked={adr.disability}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Disability or Permanent Damage
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
                                    name="anomaly"
                                    checked={adr.anomaly}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Congenital Anomaly/Birth Defects
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            {adr.eventDescription === "" ? (
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
                                    value={adr.outcomes}
                                    onChange={handleBioInputChange}
                                  >
                                    <option value="">
                                      --Please choose an option--
                                    </option>
                                    {outcomes?.map((outcome, index) => (
                                      <option
                                        key={outcome.code}
                                        value={outcome.code}
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
                                    name="intervention"
                                    checked={adr.intervention}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Require Intervention to Permanent Impairment
                                  or Disability (Devices)
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            {adr.outcomes === "" ? (
                              ""
                            ) : (
                              <div className="form-group mb-3 col-md-6">
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
                                    value={adr.onsetDate}
                                    onChange={handleBioInputChange}
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
                                    name="others"
                                    checked={adr.others}
                                    onChange={handleBioInputChange}
                                  />{" "}
                                  Others
                                </label>
                              </FormGroup>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <div className="form-group mb-3 col-md-6">
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
                                  value={adr.stoppedDate}
                                  onChange={handleBioInputChange}
                                  style={{ border: "1px solid #014d88" }}
                                />
                              </FormGroup>
                            </div>
                          </td>
                        </tr>

                        {/* <tr>
                          <td>Mark</td>
                          <td>Otto</td>
                        </tr> */}
                      </tbody>
                    </table>
                    {/* <row> */}{" "}
                    {adr.others === false ? (
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
                            value={adr.otherDescription}
                            onChange={handleBioInputChange}
                            style={{
                              border: "1px solid #014d88",
                            }}
                          />
                        </FormGroup>
                      </div>
                    )}{" "}
                    {adr.outcomes ===
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
                            value={adr.outcomesOtherDescription}
                            onChange={handleBioInputChange}
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
              {/* <div
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
              </div> */}

              {/* <div className="card-body">
                <div className="basic-form">
                  <div className="row">
                    <h3>Product Details</h3>
                    <Drug adverseEffect={adr?.onsetDate} />
                  </div>
                </div>
              </div> */}

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
                    {/* <h3>All medicines taken within the last 3 months</h3> */}

                    {/* <DrugMedicine /> */}

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
                          value={adr.preexistingMedicalConditions}
                          onChange={handleBioInputChange}
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
                    {adr.preexistingMedicalConditions !==
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
                            value={adr.preexistingMedicalOthers}
                            onChange={handleBioInputChange}
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
                          value={adr.firstName}
                          onChange={handleBioInputChange}
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
                          name="lastName"
                          id="lastName"
                          value={adr.lastName}
                          onChange={handleBioInputChange}
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
                          value={adr.address}
                          onChange={handleBioInputChange}
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
                          value={adr.country}
                          onChange={handleBioInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
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
                          value={adr.city}
                          onChange={handleBioInputChange}
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
                          value={adr.state}
                          onChange={handleBioInputChange}
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
                          name="phoneNumber"
                          id="phoneNumber"
                          value={adr.phoneNumber}
                          onChange={handleBioInputChange}
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
                          value={adr.email}
                          onChange={handleBioInputChange}
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
                          name="healthProfessional"
                          id="healthProfessional"
                          style={{ border: "1px solid #014d88" }}
                          value={adr.healthProfessional}
                          onChange={handleBioInputChange}
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
                          value={adr.occupation}
                          onChange={handleBioInputChange}
                          style={{ border: "1px solid #014d88" }}
                        />
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
                          value={adr.reportDate}
                          onChange={handleBioInputChange}
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
                            Update
                          </span>
                        ) : (
                          <span style={{ textTransform: "capitalize" }}>
                            Updating...
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

export default EditForm;
