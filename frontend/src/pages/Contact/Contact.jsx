import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import {
  sendContactEmail,
  resetEmailState,
  selectEmailStatus,
  selectEmailError,
  selectEmailSuccess,
} from "../../store/slices/emailSlice";
import "./Contact.scss";

const Contact = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectEmailStatus);
  const error = useSelector(selectEmailError);
  const success = useSelector(selectEmailSuccess);
  const formFields = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(formFields);

  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Reset email state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetEmailState());
    };
  }, [dispatch]);

  // Show snackbar when status changes
  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      setOpenSnackbar(true);
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(sendContactEmail(formData));
      setFormData(formFields);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: "Phone Number",
      content: "+212 701171398",
      link: "tel:+212 701171398",
    },
    {
      icon: <EmailIcon />,
      title: "Email Address",
      content: "zonshopstor@gmail.com",
      link: "mailto:zonshopstor@gmail.com",
    },
    {
      icon: <TimeIcon />,
      title: "Working Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: "https://facebook.com" },
    { icon: <TwitterIcon />, url: "https://twitter.com" },
    { icon: <InstagramIcon />, url: "https://instagram.com" },
    { icon: <LinkedInIcon />, url: "https://linkedin.com" },
  ];

  return (
    <Box className="contact-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="h1" className="hero-title">
              Contact Us
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Get in touch with our team
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Info Section */}
      <Container maxWidth="lg" className="contact-info-section">
        <Grid container spacing={4} justifyContent="center">
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="contact-info-card" sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  <Box
                    className="contact-info-icon"
                    sx={{
                      marginBottom: "1rem",
                      "& svg": {
                        fontSize: "2.5rem",
                        color: "primary.main",
                      },
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    className="contact-info-title"
                    sx={{
                      marginBottom: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {info.title}
                  </Typography>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-link"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="body1"
                        className="contact-info-content"
                        sx={{ color: "text.secondary" }}
                      >
                        {info.content}
                      </Typography>
                    </a>
                  ) : (
                    <Typography
                      variant="body1"
                      className="contact-info-content"
                      sx={{ color: "text.secondary" }}
                    >
                      {info.content}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form Section */}
      <Box className="contact-form-section">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box className="contact-form-content">
                <Typography variant="h2" className="section-title">
                  Send us a Message
                </Typography>
                <Typography variant="body1" className="section-text">
                  Have questions or feedback? We'd love to hear from you. Fill
                  out the form below and we'll get back to you as soon as
                  possible.
                </Typography>
                <form onSubmit={handleSubmit} className="contact-form">
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                    className="form-field"
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                    className="form-field"
                  />
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    required
                    className="form-field"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    required
                    className="form-field"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className="submit-button"
                    disabled={status === "loading"}
                    startIcon={
                      status === "loading" ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Social Links Section */}
      <Box className="social-links-section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="section-title text-center">
            Follow Us
          </Typography>
          <Box className="social-links">
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success
            ? "Your message has been sent successfully!"
            : error || "Failed to send message. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
