import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import { token, url as baseUrl } from "../../api";
import { Form, FormGroup, Label, Spinner } from "reactstrap";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DrugMedicine = () => {
  const [storedValues, setStoredValues] = useState([]);

  const [concomitantMedicines, setConcomitantMedicines] = useState({
    concomitant_brand_name: "",
    concomitant_dosage: "",
    concomitant_route: "",
    date_concomitant_started: "",
    date_concomitant_stopped: "",
    concomitant_reason_use: "",
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

  const addForm = (e) => {
    e.preventDefault();
    const newValues = [...storedValues, concomitantMedicines];
    setStoredValues(newValues);
    localStorage.setItem("medicine", JSON.stringify(newValues));

    setConcomitantMedicines({
      concomitant_brand_name: "",
      concomitant_dosage: "",
      concomitant_route: "",
      date_concomitant_started: "",
      date_concomitant_stopped: "",
      concomitant_reason_use: "",
    });
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
      <div className="form-group mb-3 col-md-3">
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
      <div className="form-group mb-3 col-md-3">
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
      <div className="form-group  col-md-6">
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
            <table className="table table-sm table-bordered table-responsive">
              <thead>
                <tr>
                  <th scope="col">Brand or Generic name</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Route</th>
                  <th scope="col">Date started</th>
                  <th scope="col">Date stopped</th>
                  <th scope="col">Reason for Use</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {storedValues.map((x, i) => (
                  <tr key={i}>
                    <td>{x.concomitant_brand_name}</td>
                    <td>{x.concomitant_dosage}</td>
                    <td>{x.concomitant_route}</td>
                    <td>{x.date_concomitant_started}</td>
                    <td>{x.date_concomitant_stopped}</td>
                    <td>{x.concomitant_reason_use}</td>

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
