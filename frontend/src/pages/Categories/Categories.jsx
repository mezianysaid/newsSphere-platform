import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";
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
  MenuItem,
} from "@mui/material";
import {
  Search,
  FilterList,
  NewReleases,
  Visibility,
  ArrowBack,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { fetchArticles } from "../../store/actions/articleActions";
import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";

const Categories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.articles);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const newsCategories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Politics" },
    { id: 3, name: "Business" },
    { id: 4, name: "Sports" },
    { id: 5, name: "World" },
    { id: 6, name: "Science" },
    { id: 7, name: "Health" },
    { id: 8, name: "Entertainment" },
  ];

  const filteredCategories = useMemo(
    () =>
      newsCategories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const selectedCategoryName = useMemo(
    () => newsCategories.find((c) => c.id === selectedCategory)?.name,
    [selectedCategory]
  );

  const filteredArticles = useMemo(() => {
    if (!selectedCategoryName) return [];
    return (articles || []).filter(
      (a) =>
        (a.category || "").toLowerCase() === selectedCategoryName.toLowerCase()
    );
  }, [articles, selectedCategoryName]);

  const sortArticles = (items, key) => {
    const sorted = [...items];
    switch (key) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
        );
      case "most-viewed":
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      default:
        return sorted;
    }
  };

  const sortedArticles = useMemo(
    () => sortArticles(filteredArticles, sortBy),
    [filteredArticles, sortBy]
  );

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
    { value: "newest", label: "Newest", icon: <NewReleases /> },
    { value: "most-viewed", label: "Most Viewed", icon: <Visibility /> },
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
          {newsCategories.map((category) => (
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
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box
            className="hero-content"
            sx={{
              padding: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Box
              className="page-header"
              sx={{
                marginBottom: { xs: 1, sm: 2 },
                display: "flex",
                flexDirection: "column",
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                Latest coverage
              </Typography>
              <Typography
                variant="h4"
                className="page-title"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  marginBottom: "0.25rem",
                  fontWeight: 600,
                }}
              >
                Browse {""}
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  News
                </span>{" "}
                and Updates
              </Typography>
              <Typography
                variant="body1"
                className="page-subtitle"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  marginBottom: "0.25rem",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Search, filter and sort the latest articles.
              </Typography>
            </Box>

            <Box className="filters-section" sx={{ display: "grid", gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={
                  selectedCategory
                    ? "Search articles..."
                    : "Search categories..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    height: { xs: "36px", sm: "40px" },
                    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.6)",
                    },
                  },
                }}
                className="searchAction"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "white" }}>
                      <Search sx={{ color: "white", fontSize: "1.25rem" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "white" }}
                        >
                          <CategoryIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255,255,255,0.6)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.85)",
                      },
                    }}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {newsCategories.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "white" }}
                        >
                          <NewReleases />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(255,255,255,0.6)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.85)",
                      },
                    }}
                  >
                    {sortOptions.map((o) => (
                      <MenuItem key={o.value} value={o.value}>
                        {o.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Box className="hero-actions">
                <Button
                  className="primary-btn"
                  onClick={() => navigate("/news")}
                >
                  View latest
                </Button>
                <Button
                  className="secondary-link"
                  onClick={() => navigate("/trending")}
                >
                  Explore trends
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {selectedCategory ? (
        <Grid
          container
          spacing={3}
          className="articles-grid"
          sx={{ margin: 2 }}
        >
          {loading ? (
            <Grid item xs={12}>
              <Typography variant="body1">Loading articles...</Typography>
            </Grid>
          ) : sortedArticles.length > 0 ? (
            sortedArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={article._id}>
                <Box
                  className="news-card"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/article/${article._id}`)}
                >
                  <Box
                    className="news-image"
                    sx={{ height: 180, overflow: "hidden", borderRadius: 2 }}
                  >
                    {article.coverImage ? (
                      <img
                        src={getImageUrl(article.coverImage)}
                        alt={article.title}
                        crossOrigin="anonymous"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          background: "#f1f2f6",
                        }}
                      />
                    )}
                  </Box>
                  <Box className="news-content" sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      {article.category}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {article.title}
                    </Typography>
                    {article.excerpt && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {article.excerpt}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                      }}
                    >
                      <Visibility fontSize="small" />
                      <Typography variant="caption">
                        {article.views || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1">
                No articles found in this category.
              </Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container spacing={3} className="categories-grid">
          {filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Box
                onClick={() => handleCategoryCardClick(category.id)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f8f9fa",
                  border: "1px solid rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all .2s ease",
                  "&:hover": {
                    bgcolor: "#ee5a24",
                    color: "#fff",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Explore latest {category.name.toLowerCase()} stories
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {isMobile && <FilterDrawer />}
    </Box>
  );
};

export default Categories;
