import React from "react";

const EmpTable = (props) => {
  return (
    <div className="py-3 table-responsive">
      <table className="table">
        <thead>
          <tr className="table-head">
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Email ID</th>
          </tr>
        </thead>
        <tbody>
          {props.employee.map((emp) => {
            return (
              <tr key={emp.email}>
                <td className="fw-bold">{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmpTable;
