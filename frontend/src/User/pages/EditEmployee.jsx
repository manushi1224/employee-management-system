import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../images/user-default.jpg"

const EditEmployee = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `https://employee-management-system-ujnj.onrender.com/api/users/${uid}`
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        message.error("Could not fetch data");
      }
    };
    getUserData();
  }, [uid]);

  const onFinish = async (values) => {
    const { username, email, position, upload } = values;
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("position", position);
    if(upload){
      formData.append("image", upload[0].originFileObj);
    }
    try {
      await axios.patch(
        `https://employee-management-system-ujnj.onrender.com/api/users/editEmployee/${uid}`,
        formData
      );
      setLoading(true)
      message.success("Profile Updated successfully")
      navigate("/dashboard")
    } catch (error) {
      message.error("Could not update data..Please try again!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors[0]);
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
          >
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              defaultFileList={[
                {
                  uid: 1,
                  name: "user",
                  url: defaultImage,
                  status: "done"
                }
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditEmployee;
