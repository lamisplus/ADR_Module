import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { token, url as baseUrl } from "../../../api";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DrugMedicine = () => {
  const [storedValues, setStoredValues] = useState([]);
  const [errors, setErrors] = useState({});
  const styles = {
    color: "#f85032",
    fontSize: "11px",
  };

  const [concomitantMedicines, setConcomitantMedicines] = useState({
    concomitantBrandName: "",
    concomitantDosage: "",
    concomitantRoute: "",
    dateConcomitantStarted: "",
    dateConcomitantStopped: "",
    concomitantReasonUse: "",
    relevantTest: "",
    relevantTestDate: "",
    relevantResult: "",
    relevantResultDate: "",
  });

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("medicine")) || [];
    setStoredValues(values);
  }, []);

  const handleMedicineInputChange = (event) => {
    const { name, value } = event.target;
    setConcomitantMedicines({
      ...concomitantMedicines,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const temp = { ...errors };
    temp.concomitantBrandName = concomitantMedicines.concomitantBrandName
      ? ""
      : "Concomitant Brand Name is required.";
    temp.concomitantDosage = concomitantMedicines.concomitantDosage
      ? ""
      : "Concomitant Dosage is required.";
    temp.concomitantRoute = concomitantMedicines.concomitantRoute
      ? ""
      : "Concomitant route is required.";
    temp.dateConcomitantStarted = concomitantMedicines.dateConcomitantStarted
      ? ""
      : "Date Concomitant Started is required.";
    temp.dateConcomitantStopped = concomitantMedicines.dateConcomitantStopped
      ? ""
      : "Date Concomitant Stopped is required.";
    temp.concomitantReasonUse = concomitantMedicines.concomitantReasonUse
      ? ""
      : "Concomitant Reason Use is required.";
    temp.relevantTest = concomitantMedicines.relevantTest
      ? ""
      : "Relevant Test is required.";
    temp.relevantTestDate = concomitantMedicines.relevantTestDate
      ? ""
      : "Relevant Test Date is required.";
    temp.relevantResult = concomitantMedicines.relevantResult
      ? ""
      : "Relevant Result is required.";
    temp.relevantResultDate = concomitantMedicines.relevantResultDate
      ? ""
      : "Relevant Result Date is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const addForm = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const newValues = [...storedValues, concomitantMedicines];
      setStoredValues(newValues);
      localStorage.setItem("medicine", JSON.stringify(newValues));

      setConcomitantMedicines({
        concomitantBrandName: "",
        concomitantDosage: "",
        concomitantRoute: "",
        dateConcomitantStarted: "",
        dateConcomitantStopped: "",
        concomitantReasonUse: "",
        relevantTest: "",
        relevantTestDate: "",
        relevantResult: "",
        relevantResultDate: "",
      });
    }
  };

  const deteleItem = (index) => {
    const newValues = storedValues.filter((_, i) => i !== index);
    setStoredValues(newValues);
    localStorage.setItem("medicine", JSON.stringify(newValues));
  };

  return (
    <div className="row">
      <div className="form-group  col-md-4">
        <FormGroup>
          <Label>
            Brand or Generic name{" "}
            {/* <span style={{ color: "red" }}>*</span> */}
          </Label>
          <input
            className="form-control"
            type="text"
            name="concomitantBrandName"
            id="concomitantBrandName"
            value={concomitantMedicines.concomitantBrandName}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.concomitantBrandName !== "" ? (
            <span style={styles}>{errors.concomitantBrandName}</span>
          ) : (
            ""
          )}
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
            type="number"
            name="concomitantDosage"
            id="concomitantDosage"
            value={concomitantMedicines.concomitantDosage}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.concomitantDosage !== "" ? (
            <span style={styles}>{errors.concomitantDosage}</span>
          ) : (
            ""
          )}
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
            name="concomitantRoute"
            id="concomitantRoute"
            value={concomitantMedicines.concomitantRoute}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.concomitantRoute !== "" ? (
            <span style={styles}>{errors.concomitantRoute}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group mb-3 col-md-3">
        <FormGroup>
          <Label for="onset_date">
            Date started
            {/* <span style={{ color: "red" }}>*</span> */}
          </Label>
          <input
            className="form-control"
            type="date"
            name="dateConcomitantStarted"
            id="dateConcomitantStarted"
            value={concomitantMedicines.dateConcomitantStarted}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.dateConcomitantStarted !== "" ? (
            <span style={styles}>{errors.dateConcomitantStarted}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group mb-3 col-md-3">
        <FormGroup>
          <Label for="dateConcomitantStopped">
            Date stopped
            {/* <span style={{ color: "red" }}>*</span> */}
          </Label>
          <input
            className="form-control"
            type="date"
            name="dateConcomitantStopped"
            id="dateConcomitantStopped"
            value={concomitantMedicines.dateConcomitantStopped}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.dateConcomitantStopped !== "" ? (
            <span style={styles}>{errors.dateConcomitantStopped}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group  col-md-6">
        <FormGroup>
          <Label>
            Reason for Use
            {/* <span style={{ color: "red" }}>*</span> */}
          </Label>
          <input
            className="form-control"
            type="text"
            name="concomitantReasonUse"
            id="concomitantReasonUse"
            value={concomitantMedicines.concomitantReasonUse}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.concomitantReasonUse !== "" ? (
            <span style={styles}>{errors.concomitantReasonUse}</span>
          ) : (
            ""
          )}
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
            name="relevantTest"
            id="relevantTest"
            value={concomitantMedicines.relevantTest}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.relevantTest !== "" ? (
            <span style={styles}>{errors.relevantTest}</span>
          ) : (
            ""
          )}
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
            name="relevantTestDate"
            id="relevantTestDate"
            value={concomitantMedicines.relevantTestDate}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.relevantTestDate !== "" ? (
            <span style={styles}>{errors.relevantTestDate}</span>
          ) : (
            ""
          )}
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
            name="relevantResult"
            id="relevantResult"
            value={concomitantMedicines.relevantResult}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.relevantResult !== "" ? (
            <span style={styles}>{errors.relevantResult}</span>
          ) : (
            ""
          )}
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
            name="relevantResultDate"
            id="relevantResultDate"
            value={concomitantMedicines.relevantResultDate}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
            min={concomitantMedicines.relevantTestDate}
          />
          {errors.relevantResultDate !== "" ? (
            <span style={styles}>{errors.relevantResultDate}</span>
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
            backgroundColor: "rgb(153, 46, 98)",
            fontWeight: "bolder",
          }}
          startIcon={<AddIcon />}
          onClick={addForm}
        >
          Add
        </Button>
      </row>
      {storedValues.length > 0 && (
        <>
          <div className="col-xl-12 col-lg-12">
            <br />
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th scope="col">Brand or Generic name</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Route</th>
                  <th scope="col">Date started</th>
                  <th scope="col">Date stopped</th>
                  <th scope="col">Reason for Use</th>
                  <th scope="col">Relevant Test</th>
                  <th scope="col">Relevant Test Date</th>
                  <th scope="col">Relevant Result</th>
                  <th scope="col">Relevant Result Date</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {storedValues.map((x, i) => (
                  <tr key={i}>
                    <td>{x.concomitantBrandName}</td>
                    <td>{x.concomitantDosage}</td>
                    <td>{x.concomitantRoute}</td>
                    <td>{x.dateConcomitantStarted}</td>
                    <td>{x.dateConcomitantStopped}</td>
                    <td>{x.concomitantReasonUse}</td>
                    <td>{x.relevantTest}</td>
                    <td>{x.relevantTestDate}</td>
                    <td>{x.relevantResult}</td>
                    <td>{x.relevantResultDate}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        className=" float-right ms-1"
                        style={{
                          backgroundColor: "rgb(153, 46, 98)",
                          fontWeight: "bolder",
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => deteleItem(i)}
                      ></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DrugMedicine;
