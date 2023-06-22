import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

const EmailInputForm = () => {
  const [isError, setIsError] = useState("");
  // const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // call api to reset password
      const res = await UserService.generateResetPasswordLink(data.email);

      // handle res
      if (res.success === true) {
        // setMessage(res.message);
        setIsError(false);
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
      });
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
            reset password
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
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "invalid email address"
                    }
                  })}
                />
                {errors.email ? (
                  <div
                    style={{
                      color: "darkred",
                      fontSize: "0.88rem",
                      position: "absolute",
                      marginTop: "5px"
                    }}
                  >
                    {errors.email.message}
                  </div>
                ) : null}
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

export default EmailInputForm;
