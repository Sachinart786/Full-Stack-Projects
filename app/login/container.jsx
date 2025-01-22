"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Link from "next/link";
import { isEmpty, get } from "lodash";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const validation = () => {
    let isValid = true;
    if (isEmpty(email)) {
      isValid = false;
      setEmailErr("This field is required. Please provide task name");
    }
    if (isEmpty(password)) {
      isValid = false;
      setPasswordErr("This field is required. Please provide description");
    }
    return isValid;
  };

  const handleClick = async () => {
    if (!validation()) return;
    try {
      const payload = {
        email,
        password,
      };
      const res = await axios.post("http://localhost:1010/login", payload);
      if (get(res, "data.success", false)) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (msg !== "") {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setMsg("");
      }, 5000);
    } else {
      setShow(false);
    }
  }, [msg]);
  return (
    <React.Fragment>
      <div
        style={{
          background: "linear-gradient(to right, #80dde0, #92fcaf)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "400px",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Enter Your Email"
                  type="text"
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailErr ? true : false}
                  helperText={emailErr ? emailErr : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "password" : "text"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordErr ? true : false}
                  />
                  {passwordErr && (
                    <FormHelperText error>{passwordErr}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleClick}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <p style={{ textAlign: "center" }}>
                  Dont have an account ? {" "}
                  <b>
                    <Link href="register" style={{ textDecoration: "none" }}>
                      Sign Up
                    </Link>
                  </b>
                </p>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <Grid item xs={12}>
        {show && <Alert severity="success">{msg}</Alert>}
      </Grid>
    </React.Fragment>
  );
};
