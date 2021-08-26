import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import User from "../services/user.js";
const user = new User();


const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 450,
    margin: "200px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "16px 0" };

  // describes the initial values of the respective form fields
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email id").required("Required"),
    password: Yup.string().min(8, "Password must be of atleast 8 characters"),
  });

  // This handles what happens after the user submits
  const onSubmit = (values, props) => {
    const loginDetails = {
      email: values.email,
      password: values.password,
    };
    user.login(loginDetails).then(res => {
      if(res.data.success === true){
        localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
      } else {
          toast.error('Invalid credentials...!')
      }
      }).catch((error) => {
      toast.error('Invalid Username or Password');
  });
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 1000);
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar data-testid="avatar" style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 data-testid="LOGIN">Login</h2>
        </Grid>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form data-testid="form">
              <Field
                as={TextField} data-testid='email'
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter Email"
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}  data-testid='password'
                fullWidth
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Password"
                required
                helperText={<ErrorMessage name="password" />}
              />

              <Button
                type="submit"
                data-testid="button"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign In"}
              </Button>
              </Form>
          )}
        </Formik>

              <Typography>
                Don't have an account?
                <Link data-testid="link" to="/signup"> sign up</Link>
              </Typography>
              <ToastContainer
              position="top-center" 
              />
      </Paper>
    </Grid>
  );
};

export default Login;
