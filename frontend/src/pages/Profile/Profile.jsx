import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import ProfileStats from "../../components/Profile/ProfileStats";
import userLogo from "../../assets/images/user.png";
import "../../components/Profile/Profile.scss";

import {
  selectIsAuthenticated,
  selectUser,
  selectUserLoading,
  selectUserError,
} from "../../store/selectors/userSelectors";

import { getProducts } from "../../store/actions/productActions";
import { getAllUsers } from "../../store/actions/userActions";

const Profile = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { allUsers, loading: usersLoading } = useSelector(
    (state) => state.user
  );
  const favoriteItems = useSelector((state) => state.favorites.items);
  const visitorCount = useSelector((state) => state.visitors.count);

  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalFavorites: 0,
    totalRevenue: 0,
    recentProducts: [],
    recentUsers: [],
    totalVisitors: 0,
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (products && allUsers) {
      setStatistics((prevStats) => ({
        ...prevStats,
        totalProducts: products.length,
        totalUsers: allUsers.length,
        totalFavorites: favoriteItems.length,
        totalVisitors: visitorCount,
        recentProducts: products.slice(0, 5),
        recentUsers: allUsers.slice(0, 5),
      }));
    }
  }, [products, allUsers, favoriteItems, visitorCount]);

  // Create a user object with fallback values for missing properties
  const userWithFallbacks = user
    ? {
        ...user,
        // Provide fallback values for missing properties
        avatar: userLogo,
        name: user.name || "User",
        email: user.email || "No email provided",
        phone: user.phone || "No phone provided",
        location: user.location || "No location provided",
        dob: user.dob || "Not specified",
        address: user.address || "No address provided",
        memberSince: user.memberSince || "Not available",
        language: user.language || "English",
        currency: user.currency || "USD",
        newsletter: user.newsletter || false,
        twoFactor: user.twoFactor || false,
      }
    : null;

  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="warning">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  if (loading || usersLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!userWithFallbacks) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="info">No user data available.</Alert>
      </Container>
    );
  }

  return (
    <div className="profile-container">
      <Container maxWidth="lg">
        <ProfileHeader user={userWithFallbacks} />
        {userWithFallbacks.role === "admin" && (
          <ProfileStats statistics={statistics} />
        )}
        <ProfileDetails user={userWithFallbacks} />
      </Container>
    </div>
  );
};

export default Profile;
