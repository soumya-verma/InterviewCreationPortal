import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post("/login", body, config);

      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data);
      }

      //   return <Redirect to="/" />;

      // await axios.get("/", body, config);
    } catch (err) {
      console.error(err);
    }
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1 className=" text-primary">Sign In</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
          onSubmit={(e) => onSubmit(e)}
        />
      </form>
    </Fragment>
  );
};

export default Login;
