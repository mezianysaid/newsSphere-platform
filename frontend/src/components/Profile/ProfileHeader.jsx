import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  LocationOn,
  Person,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/actions/userActions";
import userlogo from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const ProfileHeader = ({ user }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    dob: user.dob || "",
    address: user.address || "",
    language: user.language || "English",
    currency: user.currency || "USD",
    newsletter: user.newsletter || false,
    twoFactor: user.twoFactor || false,
    avatar: user.avatar || "",
  });

  const handleImageError = () => {
    setImageError(true);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "newsletter" || name === "twoFactor" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(updateUserProfile(formData));
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      handleClose();
      navigate("/profile");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box className="profile-header" sx={{ textAlign: "center", mb: 4 }}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Avatar
            src={userlogo }
            alt={user.name}
            onError={handleImageError}
            sx={{
              width: 150,
              height: 150,
              border: "4px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              mb: 2,
              objectFit: "cover",
              bgcolor: "primary.main",
            }}
          >
            {imageError && <Person sx={{ fontSize: 80 }} />}
          </Avatar>
          <IconButton
            sx={{
              position: "absolute",
              bottom: 20,
              right: 0,
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
            // onClick={handleOpen}
          >
            <Edit sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <Typography variant="h4" sx={{ mb: 1 }}>
          {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <LocationOn sx={{ fontSize: 18, verticalAlign: "text-bottom" }} />
          {user.location}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          {/* <Button
            variant="outlined"
            onClick={handleOpen}
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button> */}
          {user.role === "admin" && (
            <>
              <Tooltip title="Add product">
                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/addProduct")}
                  startIcon={<AddIcon />}
                >
                  Add Product
                </Button>
              </Tooltip>

              <Button
                variant="contained"
                onClick={() => navigate("/admin/listProducts")}
                className="manageButton"
                startIcon={<EditIcon />}
              >
                Manage Products
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Language</InputLabel>
                  <Select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    label="Language"
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="German">German</MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Currency</InputLabel>
                  <Select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    label="Currency"
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                    <MenuItem value="JPY">JPY (¥)</MenuItem>
                    <MenuItem value="CAD">CAD (C$)</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.newsletter}
                      onChange={handleChange}
                      name="newsletter"
                    />
                  }
                  label="Subscribe to Newsletter"
                  sx={{ mt: 2 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.twoFactor}
                      onChange={handleChange}
                      name="twoFactor"
                    />
                  }
                  label="Enable Two-Factor Authentication"
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileHeader;
