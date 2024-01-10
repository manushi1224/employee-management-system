import React, { useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import formReducer from "../../reducers/formReducer";
import { message } from "antd";
import axios from "axios";

const initialValue = {
  email: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  password: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  joiningDate: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  position: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  name: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  aadhar: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  panNo: {
    value: "",
    isTouched: false,
    isValid: false,
  },
  isSuperUser: false,
};

const SignUp = () => {
  const [formState, dispatch] = useReducer(formReducer, initialValue);
  const [validForm, setValidForm] = useState(false);

  const changeValueHandler = (event) => {
    dispatch({
      type: "INPUT_CHANGE",
      field: event.target.name,
      payload: event.target.value,
    });
    let isFormValid = true;
    for (const field in formState) {
      if (field !== "isFormValid" && !formState[field].isValid) {
        isFormValid = false;
        break;
      }
    }
    setValidForm(isFormValid);
  };

  const touchHandler = (field) => {
    dispatch({
      type: "TOUCHED",
      field,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch({
      type: "SUBMIT",
      payload: formState,
    });
    if (validForm) {
      try {
        const formData = {
          email: formState.email.value,
          password: formState.password.value,
          joiningDate: formState.joiningDate.value,
          position: formState.position.value,
          name: formState.name.value,
          aadhar: formState.aadhar.value,
          panNo: formState.panNo.value,
          isSuperUser: formState.isSuperUser,
          leaveDays: formState.leaveDays,
          applyForLeave: formState.applyForLeave,
          leaveStartDate: formState.leaveStartDate,
          leaveEndDate: formState.leaveEndDate,
        };
        const response = await axios.post(
          "/api/superuser/signup",
          formData
        );
        message.success(response.data.message);
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    } else {
      message.warning("Invalid Data");
    }
  };

  return (
    <div className="m-3 d-flex justify-content-center">
      <Form className="border rounded p-3 w-50 shadow" onSubmit={submitHandler}>
        <Form.Text className="text-center">
          <h2>Add a new User</h2>
        </Form.Text>
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={formState.email.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("email")}
              />
              {!formState.email.isValid && formState.email.isTouched && (
                <Form.Text className="text-danger">
                  Please enter valid email address!
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={formState.password.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("password")}
              />
              {!formState.password.isValid && formState.password.isTouched && (
                <Form.Text className="text-danger">
                  Please enter valid password!
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="joiningDate">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={formState.joiningDate.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("joiningDate")}
              />
              {!formState.joiningDate.isValid &&
                formState.joiningDate.isTouched && (
                  <Form.Text className="text-danger">
                    Please pick a valid date!
                  </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                name="position"
                type="text"
                placeholder="Enter your position"
                value={formState.position.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("position")}
              />
              {!formState.position.isValid && formState.position.isTouched && (
                <Form.Text className="text-danger">
                  Please enter your position!
                </Form.Text>
              )}
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                value={formState.name.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("name")}
              />
              {!formState.name.isValid && formState.name.isTouched && (
                <Form.Text className="text-danger">
                  Please enter your name!
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="aadhar">
              <Form.Label>Aadhar Card Number</Form.Label>
              <Form.Control
                name="aadhar"
                type="text"
                placeholder=""
                value={formState.aadhar.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("aadhar")}
              />
              {!formState.aadhar.isValid && formState.aadhar.isTouched && (
                <Form.Text className="text-danger">
                  Please enter valid aadhar card number!
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="panNo">
              <Form.Label>PAN Card Number</Form.Label>
              <Form.Control
                name="panNo"
                type="text"
                placeholder=""
                value={formState.panNo.value}
                onChange={(e) => changeValueHandler(e)}
                onBlur={() => touchHandler("panNo")}
              />
              {!formState.panNo.isValid && formState.panNo.isTouched && (
                <Form.Text className="text-danger">
                  Please enter valid PAN card number!
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="superUser">
              <Form.Check
                name="isSuperUser"
                type="checkbox"
                label="Are you a superuser?"
                value={formState.isSuperUser}
                onChange={() =>
                  dispatch({
                    type: "SWITCH_SUPERUSER",
                  })
                }
              />
            </Form.Group>
          </div>
        </div>

        <Button
          variant="dark"
          type="submit"
          className="w-100 mt-3"
          // disabled={`${formState.isFormValid} ? ${true} : ${false}`}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
