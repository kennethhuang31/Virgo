import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "./login.scss";
import { BorderedContent, AppImage, AppButton, AppIcon } from "components";
import { UserLogin } from "models";
import { store, updateUserLoginStatus, loginUser } from "app-redux";
import LogoImage from "assets/images/avatar.jpeg";

export interface LoginPropsInterface {
  setUserLoginStatus: (value: boolean) => any | void;
  loginUser: (value: UserLogin) => any | void;
}

const Login: React.FC<LoginPropsInterface> = (props: LoginPropsInterface) => {
  const [validated, setFormValidate] = useState(false);
  const [loginData, updateLogin] = useState({
    email: "",
    password: ""
  });

  const handleLoginInput = (partialState: any) => {
    updateLogin(oldState => ({
      ...oldState,
      ...partialState
    }));
  };

  const validateForm = () => {
    setFormValidate(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("handle submit");
    props.loginUser(loginData);
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>管理员登录</h1>
        <BorderedContent all={true}>
          <div className="form-div">
            <div className="form-logo">
              <AppImage url={LogoImage} shape="circle" scalable={true} />
            </div>
            <div className="form-content">
              <Form validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col sm="1">
                    <AppIcon name="client" />
                  </Col>
                  <Col sm="11">
                    <Form.Group controlId="login-email">
                      <Form.Control
                        type="email"
                        placeholder="邮箱"
                        onChange={(e: any) =>
                          handleLoginInput({ email: e.target.value })
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        请输入邮箱
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm="1">
                    <AppIcon name="client" />
                  </Col>
                  <Col sm="11">
                    <Form.Group controlId="login-password">
                      <Form.Control
                        type="password"
                        placeholder="密码"
                        onChange={(e: any) =>
                          handleLoginInput({ password: e.target.value })
                        }
                        // isInvalid={true}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        请输入密码
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="form-content-button">
                      <AppButton
                        type="confirm"
                        disabled={false}
                        text="登录"
                        isBlock={true}
                        btnType="submit"
                        onClick={validateForm}
                      />
                    </div>
                  </Col>
                </Row>
                <span>忘记密码？</span>
              </Form>
            </div>
          </div>
        </BorderedContent>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     setUserLoginStatus: (value: boolean) => {
//       dispatch(updateUserLoginStatus(value));
//     },
//     loginUser: (data: UserLogin) => {
//       dispatch(loginUser(data));
//     }
//   };
// };

const mapDispatchToProps = {
  updateUserLoginStatus,
  loginUser
};

export default connect(null, mapDispatchToProps)(Login);
