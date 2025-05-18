import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Rating,
  Chip,
  Box,
  Button,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { addToFavorites } from "../../store/slices/favoriteSlice";

import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleAddToWishlist = () => {
    if (product) {
      setIsFavorite(!isFavorite);
      dispatch(
        addToFavorites({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "../../assets/images/home1.jpg",
          rating: product.rating,
          link: product.productLink,
        })
      );
    }
  };

  if (!product) return null;

  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <Box className="product-image">
          <img
            src={`${process.env.REACT_APP_API_URL}${product.images?.[0]}`}
            crossOrigin="anonymous"
            alt={product.name}
          />
        </Box>
      </Link>
      <CardContent>
        <Box>
          <Link to={`/product/${product._id}`} className="product-link">
            <Typography variant="h6" className="product-name">
              {product.name}
            </Typography>
          </Link>
        </Box>
        <Box
          className="product-rating"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating value={product.rating} precision={0.5} readOnly />
          <Box className="product-actions">
            <IconButton
              className={`action-button ${isFavorite ? "active" : ""}`}
              onClick={handleAddToWishlist}
            >
              <FavoriteBorder />
            </IconButton>
          </Box>
        </Box>
        <Box className="product-price">
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          {product.price && (
            <Chip
              label="-10%"
              sx={{ opacity: 1, color: "white", backgroundColor: "red" }}
              size="small"
              // className="original-price"
            />
          )}
        </Box>
        {product.isAvtive && (
          <Chip
            label="New"
            color="success"
            size="small"
            className="new-badge"
          />
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="add-to-cart-button"
          startIcon={<ShoppingCart />}
          href={product.productLink}
          target="_blank"
          // onClick={handleLink(product.productLink)}
        >
          Buy on Amazon
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
