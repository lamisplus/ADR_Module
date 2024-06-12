import React from "react";
import { Table, Button } from "react-bootstrap";

const LoginList = ({ dhis2List, deleteLogin }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Dhis2 Url</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dhis2List.map((dhis2, i) => (
            <tr key={dhis2.id}>
              <td>{dhis2.url}</td>
              <td>********</td>
              <td>********</td>
              <td>
                {/* <span className="fa fa-edit" aria-hidden="true"></span>{" "} */}
                <Button
                  onClick={() => deleteLogin(dhis2.id)}
                  className="btn btn-danger btn-sm"
                >
                  <span className="fa fa-trash" aria-hidden="true"></span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default LoginList;
