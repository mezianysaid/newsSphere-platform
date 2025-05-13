import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  People,
  Visibility,
} from "@mui/icons-material";

import "./ProfileStats.scss";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Paper elevation={2} className="stat-card">
    <Box className="stat-icon" sx={{ backgroundColor: `${color}15` }}>
      <Icon sx={{ color: color }} />
    </Box>
    <Box className="stat-content">
      <Typography variant="h4" component="div" className="stat-value">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="stat-title">
        {title}
      </Typography>
    </Box>
  </Paper>
);

const ProfileStats = ({ statistics }) => {
 

  return (
    <Box className="profile-stats">
      <Typography variant="h6" className="stats-title" gutterBottom>
        Your Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={ShoppingCart}
            title="Total Products"
            value={statistics.totalProducts}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Favorite}
            title="Wishlist Items"
            value={statistics.totalFavorites}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={People}
            title="Total Users"
            value={statistics.totalUsers}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={Visibility}
            title="Profile Views"
            value={statistics.totalVisitors}
            color="#4caf50"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileStats;
