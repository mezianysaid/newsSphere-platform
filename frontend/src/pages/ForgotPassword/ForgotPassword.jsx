import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { resetPassword } from "../../store/actions/userActions";
import {
  selectUserLoading,
  selectUserError,
} from "../../store/selectors/userSelectors";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword(email));
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box className="forgot-password-root">
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="forgot-password-container"
        >
          <motion.div variants={itemVariants}>
            <Paper elevation={0} className="forgot-password-paper">
              <Typography variant="h4" className="forgot-password-title">
                Forgot Password
              </Typography>
              <Typography variant="body1" className="forgot-password-subtitle">
                Enter your email address and we'll send you a link to reset your
                password
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Password reset link has been sent to your email address
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="forgot-password-form">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="forgot-password-textfield"
                  placeholder="Enter your email"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="forgot-password-submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>

                <Typography variant="body2" className="forgot-password-back">
                  Remember your password?{" "}
                  <Typography
                    component="a"
                    href="/login"
                    className="forgot-password-back-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/login");
                    }}
                  >
                    Back to Sign In
                  </Typography>
                </Typography>
              </form>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
