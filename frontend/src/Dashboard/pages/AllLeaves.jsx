import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import ApproveLeave from "../components/ApproveLeave";
import { Spin } from "antd";
// import { Table, Card, ListGroup } from "react-bootstrap";
import { Table, Button } from "antd";

const AllLeaves = () => {
  const auth = useContext(userContext);

  // const getLeaveStatus = (status) => {
  //   switch (status) {
  //     case "rejected":
  //       return <span className="text-danger">Rejected</span>;
  //     case "approved":
  //       return <span className="text-success">Approved</span>;
  //     default:
  //       return <span>Pending</span>;
  //   }
  // };

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      filteredValue: filteredInfo.startDate || null,
      sorter: (a, b) => a.startDate - b.leaveDate,
      sortOrder: sortedInfo.columnKey === "startDate" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "leaveDate",
      key: "leaveDate",
      filteredValue: filteredInfo.leaveDate || null,
      sorter: (a, b) => a.startDate - b.leaveDate,
      sortOrder: sortedInfo.columnKey === "leaveDate" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "leave_status",
      key: "leave_status",
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      filteredValue: filteredInfo.leave_status || null,
      onFilter: (value, record) => record.leave_status.includes(value),
      ellipsis: true,
      align: "center",
    },
  ];

  useEffect(() => {
    auth.getUserData();
    // eslint-disable-next-line
  }, []);

  if (auth.isSuperUser) {
    return <ApproveLeave />;
  }

  if (!auth.currentUser) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h2>Leave Status and History</h2>
      </div>
      <div className="container">
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        {auth.currentUser && (
          <Table
            columns={columns}
            dataSource={auth.currentUser.leaveDate}
            onChange={handleChange}
            pagination={false}
          />
        )}
        {/* <Table striped>
          <thead>
            <tr>
              <th>No.</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auth.currentUser &&
              auth.currentUser.leaveDate.map((leave, index) => {
                return (
                  <tr key={leave._id}>
                    <td>{index + 1}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.leaveDate}</td>
                    <td>{getLeaveStatus(leave.leave_status)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table> */}
      </div>
    </div>
  );
};

export default AllLeaves;
