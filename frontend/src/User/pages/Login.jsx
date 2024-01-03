import React, { useContext, useReducer, useState } from "react";
import { Form, Button } from "react-bootstrap";
import formReducer from "../../reducers/formReducer";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

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
};

const Login = () => {
  const [formState, dispatch] = useReducer(formReducer, initialValue);
  const [validForm, setValidForm] = useState(false);
  const authUser = useContext(userContext);
  const navigate = useNavigate();

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
    if (validForm) {
      try {
        const response = await axios.post(
          `/api/superuser/login/`,
          {
            email: formState.email.value,
            password: formState.password.value,
          }
        );
        const { _id, isSuperUser } = response.data.user;
        message.success(response.data.message);
        authUser.login(response.data.token, _id, isSuperUser);
        navigate("/dashboard");
      } catch (error) {
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
          <h2>Log In</h2>
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

export default Login;
