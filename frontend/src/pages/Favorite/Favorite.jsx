import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { removeFromFavorites } from "../../store/slices/favoriteSlice";

import "./Favorite.scss";

const Favorite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const favoriteProducts = useSelector((state) => state.favorites.items);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(removeFromFavorites(selectedProduct.id));
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
    setSnackbarMessage("Product removed from favorites");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  console.log("fav", favoriteProducts);

  return (
    <Box className="favorite-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="h1" className="hero-title">
              My Favorites
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              {favoriteProducts.length} items in your wishlist
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Favorites Grid */}
      <Container maxWidth="lg" className="favorites-section">
        {favoriteProducts.length === 0 ? (
          <Box className="empty-state">
            <FavoriteIcon className="empty-icon" />
            <Typography variant="h5" className="empty-title">
              Your favorites list is empty
            </Typography>
            <Typography variant="body1" className="empty-text">
              Start adding products to your favorites to see them here
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="browse-button"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {favoriteProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card className="favorite-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={process.env.REACT_APP_API_URL + product.image}
                    crossOrigin="anonymous"
                    alt={product.name}
                    className="product-image"
                  />
                  <CardContent>
                    <Box className="product-header">
                      <Typography variant="h6" className="product-name">
                        {product.name}
                      </Typography>
                      <IconButton
                        className="delete-button"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box className="product-rating">
                      <StarIcon className="star-icon" />
                      <Typography variant="body2">{product.rating}</Typography>
                    </Box>
                    <Box className="product-price">
                      <Typography variant="h6" className="price">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<CartIcon />}
                      className="add-to-cart-button"
                      href={product.link}
                      target="_blank"
                    >
                      Buy on Amazon
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        className="delete-dialog"
      >
        <DialogTitle>Remove from Favorites</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove "{selectedProduct?.name}" from your
            favorites?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Favorite;
