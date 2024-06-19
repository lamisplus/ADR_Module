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
    concomitantBrandName: "",
    concomitantDosage: "",
    concomitantRoute: "",
    dateConcomitantStarted: "",
    dateConcomitantStopped: "",
    concomitantReasonUse: "",
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
      concomitantBrandName: "",
      concomitantDosage: "",
      concomitantRoute: "",
      dateConcomitantStarted: "",
      dateConcomitantStopped: "",
      concomitantReasonUse: "",
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
            name="concomitantBrandName"
            id="concomitantBrandName"
            value={concomitantMedicines.concomitantBrandName}
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
            type="number"
            name="concomitantDosage"
            id="concomitantDosage"
            value={concomitantMedicines.concomitantDosage}
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
            name="concomitantRoute"
            id="concomitantRoute"
            value={concomitantMedicines.concomitantRoute}
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
            name="dateConcomitantStarted"
            id="dateConcomitantStarted"
            value={concomitantMedicines.dateConcomitantStarted}
            onChange={handleMedicineInputChange}
            style={{ border: "1px solid #014d88" }}
          />
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
