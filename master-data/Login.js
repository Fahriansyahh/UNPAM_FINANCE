import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { LoginUserApi } from "../Action/Api/user";

function Login() {
  const history = useHistory();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const handleLogin = () => {
    setLoading(true);
    const data = { username: Username, password: Password };
    LoginUserApi(data, setError, setLoading, history);
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo mb-0 pb-0">
                <img
                  src={require("../../assets/images/Logo/logo.png")}
                  style={{ width: "50px" }}
                  alt="logo"
                />
              </div>
              <h4 className="mb-4 mt-2 pt-0 display-4">Unpam-finance-report</h4>
              {error ? (
                <div className="alert alert-danger" role="alert">
                  Akun tidak ada
                </div>
              ) : (
                false
              )}
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-1">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                    onChange={(a) => {
                      setUsername(a.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                    onChange={(a) => {
                      setPassword(a.target.value);
                    }}
                  />
                </Form.Group>
                <div className="mt-3">
                  <button
                    className="btn btn-block btn-warning btn-rounded btn-fw btn-lg font-weight-medium auth-form-btn"
                    onClick={(a) => handleLogin()}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "SIGN IN"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
