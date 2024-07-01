import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { token, url as baseUrl } from "../../../api";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import * as moment from "moment";

const Drug = ({ adverseEffect }) => {
  const [drugs, setDrugs] = useState([]);
  const [storedValues, setStoredValues] = useState([]);
  const [errors, setErrors] = useState({});
  const styles = {
    color: "#f85032",
    fontSize: "11px",
  };

  const [severeDrugs, setSevereDrugs] = useState({
    drugType: "",
    brandName: "",
    genericName: "",
    manufacturerName: "",
    manufacturerAddress: "",
    batchNo: "",
    nafdacNo: "",
    expiryDate: "",
    dosage: "",
    frequency: "",
    administrationRoute: "",
    dateMedicationStarted: "",
    dateMedicationStopped: "",
    reactionReappeared: "",
    reactionStopped: "",
  });

  const adrDrugs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}application-codesets/v2/ADR_DRUG_TYPE`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDrugs(response.data.sort());
    } catch (e) {}
  }, []);

  useEffect(() => {
    adrDrugs();
  }, []);

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem("severeDrugs")) || [];
    setStoredValues(values);
  }, []);

  const handleSevereInputChange = (event) => {
    const { name, value } = event.target;
    setSevereDrugs({
      ...severeDrugs,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const temp = { ...errors };
    temp.drugType = severeDrugs.drugType ? "" : "Drug Type is required.";
    temp.brandName = severeDrugs.brandName ? "" : "Brand Name is required.";
    temp.genericName = severeDrugs.genericName
      ? ""
      : "Generic Name is required.";
    temp.manufacturerName = severeDrugs.manufacturerName
      ? ""
      : "Manufacturer Name is required.";
    temp.manufacturerAddress = severeDrugs.manufacturerAddress
      ? ""
      : "Manufacturer Address is required.";
    temp.batchNo = severeDrugs.batchNo ? "" : "Batch No is required.";
    temp.nafdacNo = severeDrugs.nafdacNo ? "" : "Nafdac No is required.";
    temp.expiryDate = severeDrugs.expiryDate ? "" : "Expiry Date is required.";
    temp.dosage = severeDrugs.dosage ? "" : "Dosage is required.";
    temp.frequency = severeDrugs.frequency ? "" : "Frequency is required.";
    temp.administrationRoute = severeDrugs.administrationRoute
      ? ""
      : "Administration Route is required.";
    temp.dateMedicationStarted = severeDrugs.dateMedicationStarted
      ? ""
      : "Date Medication Started is required.";
    temp.dateMedicationStopped = severeDrugs.dateMedicationStopped
      ? ""
      : "Date Medication Stopped is required.";
    temp.reactionReappeared = severeDrugs.reactionReappeared
      ? ""
      : "Reaction Reappeared is required.";
    temp.reactionStopped = severeDrugs.reactionStopped
      ? ""
      : "Reaction Stopped is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const addForm = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const newValues = [...storedValues, severeDrugs];
      setStoredValues(newValues);
      localStorage.setItem("severeDrugs", JSON.stringify(newValues));

      setSevereDrugs({
        drugType: "",
        brandName: "",
        genericName: "",
        manufacturerName: "",
        manufacturerAddress: "",
        batchNo: "",
        nafdacNo: "",
        expiryDate: "",
        dosage: "",
        frequency: "",
        administrationRoute: "",
        dateMedicationStarted: "",
        dateMedicationStopped: "",
        reactionReappeared: "",
        reactionStopped: "",
      });
    }
  };

  const deteleItem = (index) => {
    const newValues = storedValues.filter((_, i) => i !== index);
    setStoredValues(newValues);
    localStorage.setItem("severeDrugs", JSON.stringify(newValues));
  };

  return (
    <div className="row">
      <div className="form-group  col-md-3">
        <FormGroup>
          <Label>
            Drug Type <span style={{ color: "red" }}>*</span>
          </Label>
          <select
            className="form-control"
            type="text"
            name="drugType"
            id="drugType"
            style={{ border: "1px solid #014d88" }}
            value={severeDrugs.drugType}
            onChange={handleSevereInputChange}
          >
            <option value="">--Please choose an option--</option>
            {drugs.map((drug, index) => (
              <option key={drug.id} value={drug.id}>
                {drug.display}
              </option>
            ))}
          </select>
          {errors.drugType !== "" ? (
            <span style={styles}>{errors.drugType}</span>
          ) : (
            ""
          )}
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
            name="brandName"
            id="brandName"
            value={severeDrugs.brandName}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.brandName !== "" ? (
            <span style={styles}>{errors.brandName}</span>
          ) : (
            ""
          )}
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
            name="genericName"
            id="genericName"
            value={severeDrugs.genericName}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.genericName !== "" ? (
            <span style={styles}>{errors.genericName}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group  col-md-3">
        <FormGroup>
          <Label>
            Name of manufacturer <span style={{ color: "red" }}>*</span>
          </Label>
          <input
            className="form-control"
            type="text"
            name="manufacturerName"
            id="manufacturerName"
            value={severeDrugs.manufacturerName}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.manufacturerName !== "" ? (
            <span style={styles}>{errors.manufacturerName}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group  col-md-3">
        <FormGroup>
          <Label>
            Address of manufacturer <span style={{ color: "red" }}>*</span>
          </Label>
          <input
            className="form-control"
            type="text"
            name="manufacturerAddress"
            id="manufacturerAddress"
            value={severeDrugs.manufacturerAddress}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.manufacturerAddress !== "" ? (
            <span style={styles}>{errors.manufacturerAddress}</span>
          ) : (
            ""
          )}
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
            name="batchNo"
            id="batchNo"
            value={severeDrugs.batchNo}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.batchNo !== "" ? (
            <span style={styles}>{errors.batchNo}</span>
          ) : (
            ""
          )}
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
            name="nafdacNo"
            id="nafdacNo"
            value={severeDrugs.nafdacNo}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.nafdacNo !== "" ? (
            <span style={styles}>{errors.nafdacNo}</span>
          ) : (
            ""
          )}
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
            name="expiryDate"
            id="expiryDate"
            value={severeDrugs.expiryDate}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.expiryDate !== "" ? (
            <span style={styles}>{errors.expiryDate}</span>
          ) : (
            ""
          )}
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
          {errors.dosage !== "" ? (
            <span style={styles}>{errors.dosage}</span>
          ) : (
            ""
          )}
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
          {errors.frequency !== "" ? (
            <span style={styles}>{errors.frequency}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group  col-md-4">
        <FormGroup>
          <Label>
            Route Administration <span style={{ color: "red" }}>*</span>
          </Label>
          <input
            className="form-control"
            type="text"
            name="administrationRoute"
            id="administrationRoute"
            value={severeDrugs.administrationRoute}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
          />
          {errors.administrationRoute !== "" ? (
            <span style={styles}>{errors.administrationRoute}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group mb-3 col-md-4">
        <FormGroup>
          <Label for="">
            Date medication started <span style={{ color: "red" }}>*</span>
          </Label>
          <input
            className="form-control"
            type="date"
            name="dateMedicationStarted"
            id="dateMedicationStarted"
            value={severeDrugs.dateMedicationStarted}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
            min={adverseEffect.onsetDate}
            max={moment(new Date()).format("YYYY-MM-DD")}
          />
          {errors.dateMedicationStarted !== "" ? (
            <span style={styles}>{errors.dateMedicationStarted}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group mb-3 col-md-4">
        <FormGroup>
          <Label for="dateMedicationStopped">
            Date medication stopped <span style={{ color: "red" }}>*</span>
          </Label>
          <input
            className="form-control"
            type="date"
            name="dateMedicationStopped"
            id="dateMedicationStopped"
            value={severeDrugs.dateMedicationStopped}
            onChange={handleSevereInputChange}
            style={{ border: "1px solid #014d88" }}
            min={severeDrugs.dateMedicationStarted}
            max={moment(new Date()).format("YYYY-MM-DD")}
          />
          {errors.dateMedicationStopped !== "" ? (
            <span style={styles}>{errors.dateMedicationStopped}</span>
          ) : (
            ""
          )}
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
            name="reactionReappeared"
            id="reactionReappeared"
            style={{ border: "1px solid #014d88" }}
            value={severeDrugs.reactionReappeared}
            onChange={handleSevereInputChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Doesn't Apply">Doesn't Apply</option>
          </select>
          {errors.reactionReappeared !== "" ? (
            <span style={styles}>{errors.reactionReappeared}</span>
          ) : (
            ""
          )}
        </FormGroup>
      </div>
      <div className="form-group  col-md-4">
        <FormGroup>
          <Label>
            Reaction reappeared after drug reintroduction{" "}
            <span style={{ color: "red" }}>*</span>
          </Label>
          <select
            className="form-control"
            type="text"
            name="reactionStopped"
            id="reactionStopped"
            style={{ border: "1px solid #014d88" }}
            value={severeDrugs.reactionStopped}
            onChange={handleSevereInputChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Doesn't Apply">Doesn't Apply</option>
          </select>
          {errors.reactionStopped !== "" ? (
            <span style={styles}>{errors.reactionStopped}</span>
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
                  <th scope="col">Drug Type</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Generic</th>
                  <th scope="col">Manufacturer</th>
                  <th scope="col">Manufacturer Address</th>
                  <th scope="col">Batch</th>
                  <th scope="col">NAFDAC</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Frequency</th>
                  <th scope="col">Route</th>
                  <th scope="col">Date Started</th>
                  <th scope="col">Date Stopped</th>
                  <th scope="col">Reaction Reappeared</th>
                  <th scope="col">Reaction Stopped</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {storedValues.map((x, i) => (
                  <tr key={i}>
                    <td>{x.drugType}</td>
                    <td>{x.brandName}</td>
                    <td>{x.genericName}</td>
                    <td>{x.manufacturerName}</td>
                    <td>{x.manufacturerAddress}</td>
                    <td>{x.batchNo}</td>
                    <td>{x.nafdacNo}</td>
                    <td>{x.expiryDate}</td>
                    <td>{x.dosage}</td>
                    <td>{x.frequency}</td>
                    <td>{x.administrationRoute}</td>
                    <td>{x.dateMedicationStarted}</td>
                    <td>{x.dateMedicationStopped}</td>
                    <td>{x.reactionReappeared}</td>
                    <td>{x.reactionStopped}</td>
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

export default Drug;
