import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  Search,
  FilterList,
  Star,
  NewReleases,
  PriceChange,
  ArrowBack,
} from "@mui/icons-material";
import { categories } from "../../data/categories";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../store/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";

const Categories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category.toLowerCase() ===
          categories.find((c) => c.id === selectedCategory)?.name.toLowerCase()
      )
    : [];

  const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "newest":
        return sortedProducts.sort((a, b) => b.id - a.id);
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      default:
        return sortedProducts;
    }
  };

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleCategoryCardClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    navigate("/categories");
  };

  const handleSortSelect = (value) => {
    setSortBy(value);
  };

  const sortOptions = [
    // { value: "featured", label: "Featured", icon: <TrendingUp /> },
    { value: "newest", label: "Newest", icon: <NewReleases /> },
    { value: "price-low", label: "Price: Low to High", icon: <PriceChange /> },
    { value: "price-high", label: "Price: High to Low", icon: <PriceChange /> },
    { value: "rating", label: "Highest Rated", icon: <Star /> },
  ];

  const FilterDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: { width: 280 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Divider sx={{ my: 2 }} />

        {selectedCategory && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ color: "black" }}
              gutterBottom
            >
              Sort By
            </Typography>
            <List>
              {sortOptions.map((option) => (
                <ListItem
                  key={option.value}
                  button
                  selected={sortBy === option.value}
                  onClick={() => handleSortSelect(option.value)}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Typography variant="subtitle1" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              button
              selected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <ListItemText primary={category.name} />
              {category.count && (
                <Chip
                  label={category.count}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box className="categories-page">
      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          padding: { xs: "0.5rem 0", sm: "0.75rem 0" },
          minHeight: "auto",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Container maxWidth="lg">
          <Box
            className="hero-content"
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Box
              className="page-header"
              sx={{
                marginBottom: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {selectedCategory && (
                <Button
                  startIcon={<ArrowBack />}
                  onClick={handleBackToCategories}
                  sx={{
                    color: "black",
                    padding: "2px 4px",
                    minWidth: "auto",
                    fontSize: "0.875rem",
                  }}
                >
                  Back to Categories
                </Button>
              )}
              <Typography
                variant="h4"
                className="page-title"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  marginBottom: "0.25rem",
                  fontWeight: 600,
                }}
              >
                {selectedCategory ? "Category Products" : "Shop by Category"}
              </Typography>
              <Typography
                variant="body1"
                className="page-subtitle"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  marginBottom: "0.25rem",
                  color: "text.secondary",
                }}
              >
                {selectedCategory
                  ? `Browse products in ${
                      categories.find((c) => c.id === selectedCategory)?.name
                    }`
                  : "Discover our curated collection of products"}
              </Typography>
            </Box>

            <Box
              className="filters-section"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "0.25rem", sm: "0.5rem" },
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder={
                  selectedCategory
                    ? "Search products..."
                    : "Search categories..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  borderRadius: 20,
                  color: "black",
                  "& .MuiOutlinedInput-root": {
                    height: { xs: "36px", sm: "40px" },
                  },
                }}
                className="searchAction"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "black" }}>
                      <Search
                        sx={{
                          color: "black",
                          borderRadius: 20,
                          fontSize: "1.25rem",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                className="filter-actions"
                sx={{
                  display: "flex",
                  gap: "0.25rem",
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                {isMobile ? (
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={() => setDrawerOpen(true)}
                    color="white"
                    className="filtersButton"
                    sx={{
                      height: {
                        xs: "36px",
                        sm: "40px",
                        color: "white",
                        mr: 20,
                      },
                      fontSize: "0.875rem",
                    }}
                  >
                    Filters
                  </Button>
                ) : (
                  <Box
                    className="sort-options"
                    sx={{
                      display: "flex",
                      gap: "0.25rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {sortOptions.map((option) => (
                      <Button
                        key={option.value}
                        className="sortFeild"
                        variant={
                          sortBy === option.value ? "outlined" : "outlined"
                        }
                        startIcon={option.icon}
                        onClick={() => setSortBy(option.value)}
                        sx={{
                          height: { xs: "36px", sm: "40px" },
                          padding: { xs: "2px 8px", sm: "4px 12px" },
                          fontSize: "0.875rem",
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {selectedCategory ? (
        <Grid container spacing={3} className="products-grid">
          {sortedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} className="categories-grid">
          {filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <CategoryCard
                category={category}
                onClick={() => handleCategoryCardClick(category.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {isMobile && <FilterDrawer />}
    </Box>
  );
};

export default Categories;
