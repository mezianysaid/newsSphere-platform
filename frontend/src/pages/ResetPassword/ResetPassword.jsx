import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    console.log(formData);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/reset-password/${token}`,
        { password: formData.password }
      );

      setSuccess("Password has been reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-password-root">
      <Container maxWidth="sm" className="reset-password-container">
        <Paper elevation={3} className="reset-password-paper">
          <Typography variant="h4" className="reset-password-title">
            Reset Password
          </Typography>
          <Typography variant="body1" className="reset-password-subtitle">
            Please enter your new password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="reset-password-form">
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="reset-password-textfield"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="reset-password-textfield"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="reset-password-submit"
            >
              Reset Password
            </Button>
          </form>

          <Box className="reset-password-back">
            <Typography variant="body2">
              Remember your password?{" "}
              <span
                className="reset-password-back-link"
                onClick={() => navigate("/signin")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;
