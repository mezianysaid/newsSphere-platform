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
      bio: "",
    },
  ];

  const values = [
    {
      icon: <StoreIcon />,
      title: "Trusted Reporting",
      description:
        "Independent journalism with fact-checked stories and clear sourcing.",
    },
    {
      icon: <ShippingIcon />,
      title: "Fast Updates",
      description: "Real-time coverage and breaking alerts around the clock.",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure & Private",
      description:
        "Responsible data practices to protect your privacy and preferences.",
    },
    {
      icon: <SupportIcon />,
      title: "Community Support",
      description: "We listen, respond, and improve with our readers.",
    },
  ];

  return (
    <Box className="about-page">
      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%), linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1020 100%)",
          pt: { xs: 4, sm: 6 },
          pb: { xs: 4, sm: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              About
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "white" }}>
              About {""}
              <span
                style={{
                  background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NewsSphere
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.85)", mt: 1 }}
            >
              Independent reporting. Real-time updates. Insights that matter.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Company Info Section */}
      <Container maxWidth="lg" className="company-info-section" m={1}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box className="company-info-content">
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    bgcolor: "#eef2ff",
                    color: "#4f46e5",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Since 2025
                </Box>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    bgcolor: "#fff7ed",
                    color: "#ea580c",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Independent & Ad‑Light
                </Box>
              </Box>

              <Typography variant="h2" className="section-title">
                NewsSphere
              </Typography>
              <Typography variant="body1" className="section-text">
                NewsSphere is a modern newsroom built for clarity. We combine
                real‑time reporting with deep analysis to help readers navigate
                technology, politics, business, science, sports, and culture.
              </Typography>
              <Typography
                variant="body1"
                className="section-text"
                sx={{ mt: 2 }}
              >
                Our editors follow strict sourcing standards and verification
                workflows. From breaking alerts to investigative features, our
                mission is simple: deliver facts with context and nuance.
              </Typography>

              <Box className="stats-container">
                <Box className="stat-item">
                  <Typography variant="h3">250K+</Typography>
                  <Typography variant="body2">Monthly Readers</Typography>
                </Box>
                <Box className="stat-item">
                  <Typography variant="h3">12K+</Typography>
                  <Typography variant="body2">Published Articles</Typography>
                </Box>
                <Box className="stat-item">
                  <Typography variant="h3">95%</Typography>
                  <Typography variant="body2">Reader Trust Index</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  className="company-image"
                  sx={{ borderRadius: 2, overflow: "hidden" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1640&auto=format&fit=crop"
                    alt="Newsroom"
                    style={{ width: "100%", height: 360, objectFit: "cover" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800&auto=format&fit=crop"
                    alt="Field reporting"
                    style={{ width: "100%", height: 160, objectFit: "cover" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
                    alt="Editorial meeting"
                    style={{ width: "100%", height: 160, objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            </Grid>
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
