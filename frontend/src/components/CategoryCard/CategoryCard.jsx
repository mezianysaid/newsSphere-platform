import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { LocalOffer } from "@mui/icons-material";
import "./CategoryCard.scss";

const CategoryCard = ({ category, onClick }) => {
  return (
    <Card className="category-card" onClick={onClick}>
      <CardMedia
        component="img"
        height="200"
        image={category.image}
        alt={category.name}
        className="category-image"
      />
      <CardContent className="category-content">
        <Typography variant="h6" className="category-name">
          {category.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="category-description"
        >
          {category.description}
        </Typography>
        <Box className="category-meta">
          <Chip
            icon={<LocalOffer />}
            label={`+${category.count} Products`}
            size="small"
            variant="outlined"
          />
          {category.discount && (
            <Chip
              label={`${category.discount}% OFF`}
              color="error"
              size="small"
            />
          )}
        </Box>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          className="explore-button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
