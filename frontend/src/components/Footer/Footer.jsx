import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";
import "./Footer.scss";

const Footer = () => {
  const footerLinks = {
    sections: [
      { name: "Latest News", href: "/news" },
      { name: "Trending", href: "/news" },
      { name: "Politics", href: "/news" },
      { name: "Business", href: "/news" },
      { name: "Technology", href: "/news" },
      { name: "Sports", href: "/news" },
    ],
    resources: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Advertise", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: <Facebook />,
      href: "https://www.facebook.com/profile.php?id=100055833765220",
    },
    {
      icon: <Instagram />,
      href: "https://www.instagram.com/said__codes?igsh=MWs4NzNwbmxvdzExNg==",
    },
    {
      icon: <LinkedIn />,
      href: "https://www.linkedin.com/in/said-meziany-705357228",
    },
  ];

  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand / About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-title">
              About NewsSphere
            </Typography>
            <Typography variant="body2" className="footer-description">
              NewsSphere brings you breaking news, in-depth analysis, and expert
              insights from around the world. Stay informed with trusted
              journalism and real-time updates across politics, business,
              technology, sports, and more.
            </Typography>
            <Box className="social-links">
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component={Link}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" className="footer-title">
              Sections
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks.sections.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" className="footer-title">
              Resources
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" className="footer-title">
              Contact Us
            </Typography>
            <Box className="contact-info">
              <Box className="contact-item">
                <Email className="contact-icon" />
                <Typography variant="body2">news@newssphere.com</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer-divider" />

        {/* Bottom Bar */}
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} NewsSphere. All rights reserved.
          </Typography>
          <Box className="payment-methods">
            <Typography variant="body2" className="payment-text">
              Independent journalism.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
