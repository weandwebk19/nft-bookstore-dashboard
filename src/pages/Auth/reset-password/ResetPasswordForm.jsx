import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import UserService from "@/services/userService";

const ResetPasswordForm = () => {
  const [isError, setIsError] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // call api to reset password
      const { password } = data;
      const res = await UserService.resetPassword(token, password);

      // handle res
      if (res.success === true) {
        // setMessage(res.message);
        setIsError(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // setMessage(res.message);
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
      // setMessage(err.message);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <CssBaseline />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h3" gutterBottom>
            reset password.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  id="password"
                  label="new-password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  {...register("password", {
                    required: "required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i,
                      message: `password must be 8-16 characters, at least one uppercase letter, one lowercase letter, one number and one special character`
                    }
                  })}
                />
                <Grid item>
                  {errors.password ? (
                    <div
                      style={{
                        color: "darkred",
                        fontSize: "0.88rem",
                        marginTop: "5px"
                      }}
                    >
                      {errors.password.message}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm-password"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "passwords do not match";
                      }
                    }
                  })}
                />
                <Grid item>
                  {errors.confirmPassword ? (
                    <div
                      style={{
                        color: "darkred",
                        fontSize: "0.88rem",
                        marginTop: "5px"
                      }}
                    >
                      {errors.confirmPassword.message}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="primary" sx={{ mt: 6 }}>
              reset password
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ mt: 6 }}
            >
              <Grid item>
                <Link href="/login" variant="body2">
                  have you already an account? <b>log in</b>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      {/* {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
      })()} */}
    </Box>
  );
};

export default ResetPasswordForm;
