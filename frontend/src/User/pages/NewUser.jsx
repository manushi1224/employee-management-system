import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

const FormGroup = (value) => {
  return (
    <Form.Group className="mb-3" controlId={value.id}>
      {value.id === "superuser" ? (
        <Form.Check
          type={value.type}
          label="Admin rights?"
          {...value.register(value.id)}
        />
      ) : (
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
      )}
      {value.errors?.message && (
        <Form.Text className="text-danger">{value.errors?.message}</Form.Text>
      )}
    </Form.Group>
  );
};

const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authUser = useContext(userContext)

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = {
        email: data.email,
        password: data.password,
        joiningDate: data.joinDate,
        position: data.position,
        name: data.name,
        aadhar: data.aadharNo,
        panNo: data.panNo,
        isSuperUser: data.superuser,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        githubId: data.githubId,
        linkedIn: data.linkedIn,
        phone: data.tel,
      };
      const response = await axios.post("https://employee-management-system-ujnj.onrender.com/api/superuser/signup", formData, {
        headers: {
          Authorization: "Bearer " + authUser.token,
        },
      });
      console.log(response);
      message.success(response.data.message);
    } catch (error) {
      console.log(error);
      message.error(error);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center profile-detail-heading">Add new employee</h2>
      <div className="d-flex justify-content-center my-4">
        <Form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4">
          <div className="row">
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.name}
                type="text"
                placeholder="enter your name"
                label="Full Name"
                id="name"
                required={true}
                pattern=""
              />
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
              <FormGroup
                register={register}
                errors={errors.joinDate}
                type="date"
                placeholder="Joining Date"
                label="Joining Date"
                id="joinDate"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.position}
                type="text"
                placeholder="Position"
                label="Position"
                id="position"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.dateOfBirth}
                type="date"
                placeholder=""
                label="Date Of Birth"
                id="dateOfBirth"
                required={true}
                pattern={/^\d{4}-\d{2}-\d{2}$/}
                message="please enter valid date"
              />
              <FormGroup
                register={register}
                errors={errors.superuser}
                type="checkbox"
                id="superuser"
                required={false}
              />
            </div>
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.aadharNo}
                type="text"
                placeholder="XXXX XXXX XXXX"
                label="Aadhar Card No"
                id="aadharNo"
                required={true}
                pattern={/^[2-9][0-9]{3} [0-9]{4} [0-9]{4}$/}
                message="enter valid aadhar number"
              />
              <FormGroup
                register={register}
                errors={errors.panNo}
                type="text"
                placeholder="Enter your PAN number"
                label="PAN No"
                id="panNo"
                required={true}
                pattern={/[A-Z]{5}[0-9]{4}[A-Z]{1}/}
                message="enter valid PAN number"
              />
              <FormGroup
                register={register}
                errors={errors.address}
                type="text"
                placeholder="City, State"
                label="Address"
                id="address"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.linkedIn}
                type="text"
                placeholder="enter your linkedInID"
                label="LinkedIn ID"
                id="linkedIn"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.githubId}
                type="text"
                placeholder="enter your github id"
                label="Github ID"
                id="githubId"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.tel}
                type="tel"
                placeholder=""
                label="Phone Number"
                id="tel"
                required={true}
                pattern={/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/}
                message="please enter valid phone number"
              />
            </div>
          </div>
          <Button variant="" type="submit" className="custom-button w-100 p-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;
