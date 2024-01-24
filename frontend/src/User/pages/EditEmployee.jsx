import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Upload, message } from "antd";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../images/user-default.jpg";

const EditEmployee = (data) => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const props = {
    headers: {
      authorization: "authorization-text",
    },
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    name: "file",
    listType: "picture",
    maxCount: 1,
  };

  useEffect(() => {
    // const getUserData = async () => {
    //   try {
    //     const response = await axios.get(`/api/users/${uid}`);
    //     setUser(response.data.user);
    //     setLoading(false);
    //   } catch (error) {
    //     message.error("Could not fetch data");
    //   }
    // };
    // getUserData();
    setUser(data.user);
    setLoading(false);
  }, [data]);

  const onFinish = async (values) => {
    const { username, email, position, upload } = values;

    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("position", position);

    if (upload) {
      formData.append("image", upload[0].originFileObj);
    }

    try {
      await axios.patch(`/api/users/editEmployee/${uid}`, formData);
      setLoading(true);
      message.success("Profile Updated successfully");
      data.changeMode()
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
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="border shadow p-5 rounded"
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
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload
              {...props}
              defaultImage={[
                {
                  uid: 1,
                  name: "user-default.jpg",
                  url: defaultImage,
                  status: "done",
                },
              ]}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
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
