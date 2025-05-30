import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
};

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const ProfileDetails = ({ user }) => {
  return (
    <Card className="profile-card">
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Personal Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Email" value={user.email} />
            <DetailItem label="Phone" value={user.phone || "Not provided"} />
            <DetailItem label="Date of Birth" value={formatDate(user.dob)} />
            <DetailItem label="Role" value={user.role || "User"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailItem
              label="Address"
              value={user.address || "Not provided"}
            />
            <DetailItem
              label="Member Since"
              value={formatDate(user.createdAt)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Preferences
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Language" value={user.language || "English"} />
            <DetailItem label="Currency" value={user.currency || "USD"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailItem
              label="Newsletter"
              value={user.newsletter ? "Subscribed" : "Not Subscribed"}
            />
            <DetailItem
              label="Two-Factor Auth"
              value={user.twoFactor ? "Enabled" : "Disabled"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
