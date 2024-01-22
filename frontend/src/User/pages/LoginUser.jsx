import React, { useContext } from "react";
import userContext from "../../context/userContext";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

const FormGroup = (value) => {
  return (
    <Form.Group className="mb-3" controlId={value.id}>
      <>
        <Form.Label className="fw-bold">{value.label}</Form.Label>
        <Form.Control
          type={value.type}
          placeholder={value.placeholder}
          {...value.register(value.id, {
            required: {
              value: value.required,
              message: "This field is required",
            },
            pattern: {
              value: value.pattern,
              message: value.message,
            },
          })}
        />
      </>
      {value.errors?.message && (
        <Form.Text className="text-danger">{value.errors?.message}</Form.Text>
      )}
    </Form.Group>
  );
};

const LoginUser = () => {
  const authUser = useContext(userContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post("/api/superuser/login", {
        email: data.email,
        password: data.password,
      });
      const { _id, isSuperUser } = response.data.user;
      console.log(response.data.message);
        message.success("Login Successfull!!");
      authUser.login(response.data.token, _id, isSuperUser);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  return (
    <div className="mt-4">
      <h2 className="text-center">Log In User</h2>
      <div className="d-flex justify-content-center my-4">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="border px-5 py-4 shadow rounded w-50"
        >
          <FormGroup
            register={register}
            errors={errors.email}
            type="email"
            placeholder="abc@gmail.com"
            label="Email Address"
            id="email"
            required={true}
            pattern={/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/}
            message="please enter valid email"
          />
          <FormGroup
            register={register}
            errors={errors.password}
            type="password"
            placeholder="password"
            label="Password"
            id="password"
            required={true}
            pattern={/^([a-zA-Z0-9@*#$%^&*!]{6,15})$/}
            message="password should contain atleast 8 characters"
          />
          <Button variant="dark" type="submit" className="w-100 p-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginUser;
