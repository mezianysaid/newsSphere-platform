import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Box,
  Grid,
  InputAdornment,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  Category as CategoryIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.scss";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Get unique categories and brands from products
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const filteredProducts = useMemo(() => {
    let filtered = products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          !selectedCategory || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });

    // Shuffle the array if sortBy is 'featured'
    if (sortBy === "featured") {
      return shuffleArray(filtered);
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container className="products-page">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="products-page">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box className="products-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Box className="filters-section">
              <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
                // sx={{ borderRadius: 20 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "black" }}>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={2} className="filters-row">
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-field"
                    // sx={{ borderRadius: 20 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "black" }}
                        >
                          <CategoryIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-field"
                    // sx={{ borderRadius: 20, color: "black" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "black" }}
                        >
                          <SortIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {filteredProducts.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No products found matching your criteria.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} className="products-grid">
            {paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Products;
