import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { token, url as baseUrl } from "../../../api";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Drug = () => {
  const [drugs, setDrugs] = useState([]);
  const [storedValues, setStoredValues] = useState([]);

  const [severeDrugs, setSevereDrugs] = useState({
    drugType: "",
    brandName: "",
    genericName: "",
    manufacturerName: "",
    manufacturerAddress: "",
    batchNo: "",
    nafdacNo: "",
    expiryDate: "",
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

  const addForm = (e) => {
    e.preventDefault();
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
    });
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
                  <th scope="col">Brand Name</th>
                  <th scope="col">Generic Name</th>
                  <th scope="col">Manufacturer Name</th>
                  <th scope="col">Manufacturer Address</th>
                  <th scope="col">Batch No</th>
                  <th scope="col">NAFDAC No</th>
                  <th scope="col">Expiry Date</th>
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
