import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { fetchProduct } from "../../store/actions/productActions";
import { addToFavorites } from "../../store/slices/favoriteSlice";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);

  const { product, loading, error } = useSelector((state) => ({
    product: state.products.product?.data,
    loading: state.products.loading,
    error: state.products.error,
  }));

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(
        addToFavorites({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          rating: product.rating,
          link: product.productLink,
        })
      );
    }
  };

  if (loading) {
    return (
      <Container>
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  return (
    <Box className="product-details-page">
      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          className="breadcrumbs"
        >
          <Link color="inherit" href="/" className="breadcrumb-link">
            Home
          </Link>
          <Link color="inherit" href="/products" className="breadcrumb-link">
            Products
          </Link>
          <Link
            color="inherit"
            href={`/category/${product.category}`}
            className="breadcrumb-link"
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4} className="product-container">
          {/* Left Column - Images */}
          <Grid item xs={12} md={6}>
            <Box className="product-gallery">
              <Box className="main-image-container">
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                      product.images?.[selectedImage] ||
                    "../../assets/images/arriv1.jpg"
                  }
                  alt={product.name}
                  className="main-image"
                />
              </Box>
              <Box className="thumbnail-grid">
                {product.images?.map((image, index) => (
                  <Box
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}${image}`}
                      crossOrigin="anonymous"
                      alt={`${product.name} - ${index + 1}`}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Product Info */}
          <Grid item xs={12} md={6}>
            <Box className="product-info">
              <Box className="header-section">
                <Typography variant="h3" className="product-name">
                  {product.name}
                </Typography>
                <Box className="product-meta">
                  <Box className="rating-container">
                    <Rating
                      value={product.rating || 0}
                      readOnly
                      precision={0.5}
                    />
                  </Box>
                  <Box className="tags">
                    <Chip label={product.category} className="category-tag" />
                  </Box>
                </Box>
              </Box>

              <Box className="price-section">
                <Typography variant="h4" className="price">
                  ${product.price?.toFixed(2)}
                </Typography>
                <Chip
                  label="In Stock"
                  className={`stock-status ${
                    product.price > 0 ? "in-stock" : "out-of-stock"
                  }`}
                />
              </Box>

              <Box className="action-buttons">
                <Button
                  variant="contained"
                  startIcon={<CartIcon />}
                  href={product.productLink}
                  target="_blank"
                  className="add-to-cart-btn"
                >
                  Buy on Amazon
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                  onClick={handleAddToWishlist}
                  className="wishlist-btn"
                >
                  Add to Wishlist
                </Button>
              </Box>

              <Box className="features-grid">
                <Box className="feature-item">
                  <ShippingIcon />
                  <Box>
                    <Typography variant="subtitle2">Free Shipping</Typography>
                    <Typography variant="body2">On orders over $100</Typography>
                  </Box>
                </Box>
                <Box className="feature-item">
                  <SecurityIcon />
                  <Box>
                    <Typography variant="subtitle2">Secure Payment</Typography>
                    <Typography variant="body2">100% secure payment</Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="tabs-section">
                <Box className="tab-content">
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" className="description">
                    {product.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;
