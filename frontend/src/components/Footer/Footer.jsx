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
    support: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Policy", href: "#" },
      { name: "Returns & Exchanges", href: "#" },
    ],
    legal: [
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Favorites", href: "/favorite" },
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
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footer-title">
              About Our Store
            </Typography>
            <Typography variant="body2" className="footer-description">
              We are your one-stop destination for all your shopping needs.
              Offering high-quality products at competitive prices with
              excellent customer service.
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
              Support
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks.support.map((link, index) => (
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
              Navigation
            </Typography>
            <Box component="ul" className="footer-links">
              {footerLinks.legal.map((link, index) => (
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
                <Phone className="contact-icon" />
                <Typography variant="body2">+212701171398</Typography>
              </Box>
              <Box className="contact-item">
                <Email className="contact-icon" />
                <Typography variant="body2">zonshopstor@gmail.com</Typography>
              </Box>

              <Box className="contact-item">
                <AccessTime className="contact-icon" />
                <Typography variant="body2">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider className="footer-divider" />

        {/* Bottom Bar */}
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright">
            © {new Date().getFullYear()} ZonShop. All rights reserved.
          </Typography>
          <Box className="payment-methods">
            <Typography variant="body2" className="payment-text">
              We accept:
            </Typography>
            <Box className="payment-icons">
              <img
                src="https://placehold.co/40x25/ffffff/000000?text=visa"
                alt="Visa"
              />
              <img
                src="https://placehold.co/40x25/ffffff/000000?text=mastercard"
                alt="Mastercard"
              />
              <img
                src="https://placehold.co/40x25/ffffff/000000?text=paypal"
                alt="PayPal"
              />
              <img
                src="https://placehold.co/40x25/ffffff/000000?text=amex"
                alt="American Express"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
