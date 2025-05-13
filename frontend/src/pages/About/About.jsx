import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Avatar,
} from "@mui/material";
import {
  Store as StoreIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";
import "./About.scss";
import shop1 from "../../assets/images/shop1.jpg";
const About = () => {
  const teamMembers = [
    {
      name: "Meziany Said",
      role: "CEO & Founder",
      image: require("../../assets/images/seo.jpg"),
      bio: "Passionate about creating the best shopping experience.",
    },
  ];

  const values = [
    {
      icon: <StoreIcon />,
      title: "Quality Products",
      description:
        "We offer only the highest quality products from trusted brands.",
    },
    {
      icon: <ShippingIcon />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep.",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Shopping",
      description:
        "Your security is our top priority with encrypted transactions.",
    },
    {
      icon: <SupportIcon />,
      title: "24/7 Support",
      description: "Our customer support team is always here to help.",
    },
  ];

  return (
    <Box className="about-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={shop1}
        >
          <source src={shop1} type="video/mp4" />
        </video>
        <Box className="hero-overlay" />
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="h1" className="hero-title">
              About ZonShop
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Your One-Stop Shop for Quality Products
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Company Info Section */}
      <Container maxWidth="lg" className="company-info-section" m={1}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="company-info-content">
              <Typography variant="h2" className="section-title">
                Our Story
              </Typography>
              <Typography variant="body1" className="section-text">
                Founded in 2025, ZonShop has grown from a small startup to a
                leading e-commerce platform. We partner directly with Amazon to
                bring you the best selection of products at competitive prices.
                All our products are sourced from Amazon's trusted marketplace,
                ensuring quality, reliability, and fast delivery through
                Amazon's extensive fulfillment network.
              </Typography>
              <Typography
                variant="body1"
                className="section-text"
                sx={{ mt: 2 }}
              >
                As an authorized Amazon affiliate, we carefully curate our
                product selection to bring you the most popular and highly-rated
                items from Amazon's vast catalog. This partnership allows us to
                offer you the same great prices, Prime shipping options, and
                customer service that Amazon is known for, while providing a
                more personalized shopping experience.
              </Typography>
              <Box className="stats-container">
                <Box className="stat-item">
                  <Typography variant="h3">10K+</Typography>
                  <Typography variant="body2">Happy Customers</Typography>
                </Box>
                <Box className="stat-item">
                  <Typography variant="h3">500+</Typography>
                  <Typography variant="body2">Products</Typography>
                </Box>
                <Box className="stat-item">
                  <Typography variant="h3">24/7</Typography>
                  <Typography variant="body2">Support</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="company-image">
              <img
                src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Our Store"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box className="values-section">
        <Container maxWidth="lg">
          <Typography variant="h2" className="section-title text-center">
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="value-card">
                  <CardContent>
                    <Box className="value-icon">{value.icon}</Box>
                    <Typography variant="h6" className="value-title">
                      {value.title}
                    </Typography>
                    <Typography variant="body2" className="value-description">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" className="team-section">
        <Typography variant="h2" className="section-title text-center">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card className="team-card" sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Box className="team-member" sx={{ textAlign: "center" }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      className="team-avatar"
                      sx={{ width: 120, height: 120, margin: "0 auto 16px" }}
                    />
                    <Typography variant="h6" className="team-name">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" className="team-role">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" className="team-bio">
                      {member.bio}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
