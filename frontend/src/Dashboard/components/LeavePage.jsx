import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { DatePicker, Form, message } from "antd";
import { Button } from "react-bootstrap";
import userContext from "../../context/userContext";
import {calculateTotalDaysSelected} from "../../utils/leaveFunctions";
import { Link, useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current < dayjs().endOf("day");
};

const LeavePage = () => {
  const authUser = useContext(userContext);
  const [totalDays, setTotalDays] = useState();
  const navigate = useNavigate();
  const [rangePicker, setRangePicker] = useState([{}]);

  useEffect(() => {
    if (rangePicker.rangepicker) {
      setTotalDays(
        calculateTotalDaysSelected(
          rangePicker.rangepicker[0],
          rangePicker.rangepicker[1]
        )
      );
    }
  }, [rangePicker]);

  useEffect(() => {
    const leaveapplication = async () => {
      if (totalDays) {
        try {
          await axios.patch(`https://employee-management-system-ujnj.onrender.com/api/leaves/applyForleave/${authUser.userId}`, {
            leaveDate: {
              leaveDays: totalDays,
              leaveStartDate: rangePicker.rangepicker[0],
              leaveEndDate: rangePicker.rangepicker[1],
            },
          });
          message.success("Applied for leave!");
          navigate("/leave-page");
        } catch (error) {
          console.log(error);
        }
      }
    };
    leaveapplication();
  }, [totalDays, rangePicker, authUser, navigate]);

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select date!",
      },
    ],
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    setRangePicker({
      rangepicker: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    });
  };

  const onFinishFailed = () => {
    message.error("Please select a date!");
  };

  return (
    <div className="mt-5 d-flex justify-content-center">
      <Form
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="border shadow p-5 rounded"
      >
        <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
          <RangePicker disabledDate={disabledDate} size="large" />
        </Form.Item>
        <Form.Item className="d-flex justify-content-center">
          <Button type="primary" htmltype="submit">
            Submit
          </Button>
          <Link to={"/leave-page"}>
            <Button variant="secondary" className="ms-3">
              Cancel
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LeavePage;
