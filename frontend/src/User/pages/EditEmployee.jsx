import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Upload, message } from "antd";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

import axios from "axios";
import userContext from "../../context/userContext";

const EditEmployee = (data) => {
  const auth = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const props = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      if (!isJpgOrPng) {
        return message.error(`uploaded file is not a png/jpg/jpeg file`);
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        return message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    headers: {
      authorization: "authorization-text",
    },
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    name: "file",
    listType: "picture",
    maxCount: 1,
  };

  useEffect(() => {
    setUser(data.user);
    setLoading(false);
  }, [data]);

  const onFinish = async (values) => {
    const { username, email, position, upload, phone, address, aadhar, panNo } =
      values;

    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("aadhar", aadhar);
    formData.append("panNo", panNo);

    if (upload) {
      formData.append("image", upload[0].originFileObj);
    }

    try {
      await axios.patch(`https://employee-management-system-ujnj.onrender.com/api/users/editEmployee/${user._id}`, formData, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      setLoading(true);
      message.success("Profile Updated successfully");
      data.changeMode();
      navigate(`/profile/${data.user._id}`);
    } catch (error) {
      message.error("Could not update data..Please try again!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please provide data!");
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="m-5 d-flex justify-content-center">
      {loading && !user ? (
        <Spin spinning={loading} fullscreen />
      ) : (
        <Form
          name="basic"
          initialValues={{
            username: user.name,
            email: user.email,
            position: user.position,
            phone: user.phone,
            address: user.address,
            aadhar: user.aadhar,
            panNo: user.panNo,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="p-5"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                pattern: new RegExp(
                  "^[+]{1}(?:[0-9-\\(\\)\\/.]s?){6,15}[0-9]{1}$"
                ),
                message: "Enter valid phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please input your position!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Aadhar No"
            name="aadhar"
            rules={[
              {
                required: true,
                pattern: "^[2-9][0-9]{3} [0-9]{4} [0-9]{4}$",
                message: "Please input valid Aadhar No!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="PAN No"
            name="panNo"
            rules={[
              {
                required: true,
                pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
                message: "Please input valid Aadhar No!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Change Progile Photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...props} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              variant="success"
              className="me-3"
            >
              <MdOutlineSaveAlt className="mb-1 me-2" /> Save
            </Button>
            <Button variant="danger" onClick={data.changeMode}>
              <RxCross1 className="mb-1 me-2" /> Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditEmployee;
