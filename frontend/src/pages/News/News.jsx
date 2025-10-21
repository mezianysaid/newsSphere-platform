import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/actions/articleActions";
import { getImageUrl } from "../../utils/imageUtils";
import {
  Container,
  Grid,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  Sort as SortIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

const News = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [...new Set(articles.map((a) => a.category).filter(Boolean))];
  }, [articles]);

  const sortOptions = [
    { value: "date-desc", label: "Newest First" },
    { value: "date-asc", label: "Oldest First" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
  ];

  const filtered = useMemo(() => {
    let list = articles
      .filter((a) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          a.title?.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q);
        const matchesCat = !selectedCategory || a.category === selectedCategory;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date-asc":
            return new Date(a.publishedAt) - new Date(b.publishedAt);
          case "title-asc":
            return (a.title || "").localeCompare(b.title || "");
          case "title-desc":
            return (b.title || "").localeCompare(a.title || "");
          default:
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
      });
    return list;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const handlePageChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
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

  return (
    <Box sx={{ py: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%), linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1020 100%)",
          pt: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gap: 2, mb: 0 }}>
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              Latest coverage
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "white" }}>
              Browse{" "}
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
              sx={{ color: "rgba(255,255,255,0.85)", mb: 1 }}
            >
              Search, filter and sort the latest articles.
            </Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "white" }}>
                      <SearchIcon />
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
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={selectedCategory}
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
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
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
                          <SortIcon />
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
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    px: 2,
                  }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Read latest
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  onClick={() => setSortBy("date-desc")}
                >
                  Reset filters
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ borderColor: "black" }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ color: "black", borderColor: "black" }}
                >
                  <SearchIcon />
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "black", borderColor: "black" }}
                    >
                      <CategoryIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
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
                      sx={{ color: "black", borderColor: "black" }}
                    >
                      <SortIcon />
                    </InputAdornment>
                  ),
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
        </Box>

        {filtered.length === 0 ? (
          <Alert severity="info">No news found.</Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginated.map((a) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={a._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {a.coverImage && (
                      <CardMedia
                        component="img"
                        image={getImageUrl(a.coverImage)}
                        crossOrigin="anonymous"
                        height="160"
                        alt={a.title}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {a.category}
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                        {a.title}
                      </Typography>
                      {a.excerpt && (
                        <Typography variant="body2" color="text.secondary">
                          {a.excerpt}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {a.tags?.slice(0, 3).map((t, i) => (
                          <Chip key={i} label={t} size="small" />
                        ))}
                      </Box>
                    </CardContent>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        href={`/article/${a._id}`}
                        sx={{ backgroundColor: "#1e293b" }}
                      >
                        <Typography sx={{ color: "white" }}>
                          Read More
                        </Typography>
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default News;
