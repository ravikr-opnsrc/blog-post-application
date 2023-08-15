import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { color, padding } from "@mui/system";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    Conformpassword: "",
  });

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:8000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        Conformpassword: inputs.Conformpassword,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [issignUp, setissignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (issignUp) {
      // sendRequest("signUp").then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then((data) => console.log(data));
      const data = await sendRequest("signUp");
      localStorage.setItem("userId", data.user._id);

      console.log(data);
      if (data.message === "success") {
        await dispatch(authActions.login());
        await navigate("/blogs").then((data) => console.log(data));
        // console.log(data);
      }
    } else {
      // sendRequest().then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then((data) => console.log(data));
      const data = await sendRequest();
      localStorage.setItem("userId", data.user._id);
      console.log(data);
      if (data.message === "success") {
        await dispatch(authActions.login());
        await navigate("/blogs").then((data) => console.log(data));
        // console.log(data);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: 450,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "10px 10px 20px #ccc",
            padding: 3,
            margin: "auto",
            marginTop: 5,
            borderRadius: 5,
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {issignUp ? "SignUp" : "Login"}
          </Typography>
          {issignUp && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              margin="normal"
              placeholder="name"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            margin="normal"
            placeholder="email"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            margin="normal"
            placeholder="password"
          />
          {issignUp && (
            <TextField
              name="Conformpassword"
              onChange={handleChange}
              value={inputs.Conformpassword}
              type={"password"}
              margin="normal"
              placeholder="Conformpassword"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, color: "white" }}
          >
            submit
          </Button>
          <Button
            onClick={() => setissignUp(!issignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            change to {issignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
