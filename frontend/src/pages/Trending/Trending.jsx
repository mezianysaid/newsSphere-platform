import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../store/actions/articleActions";
import { Container, Grid, Typography, Box, Chip, Button } from "@mui/material";
import { Visibility, TrendingUp } from "@mui/icons-material";
import { getImageUrl } from "../../utils/imageUtils";
import shop1 from "../../assets/images/shop1.jpg";

const Trending = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles, loading } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const trendingArticles = useMemo(() => {
    const items = Array.isArray(articles) ? articles : [];
    return [...items]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 12);
  }, [articles]);

  return (
    <Box className="trending-page">
      <Box className="hero-section" style={{ padding: "2rem 0" }}>
        <Container maxWidth="lg">
          <Box
            className="hero-content"
            sx={{ textAlign: "center", color: "#2c3e50" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
              Trending
              <span
                style={{
                  background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginLeft: 8,
                }}
              >
                News
              </span>
            </Typography>
            <Typography variant="h6" sx={{ color: "#7f8c8d" }}>
              Most-read stories right now
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<TrendingUp />}
                onClick={() => navigate("/news")}
                sx={{ backgroundColor: "#2c3e50", color: "white" }}
              >
                View All News
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <Typography>Loading trending articles...</Typography>
            </Grid>
          ) : trendingArticles.length > 0 ? (
            trendingArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <Box
                  className="news-card"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/article/${article._id}`)}
                >
                  <Box
                    className="news-image"
                    sx={{ height: 200, overflow: "hidden", borderRadius: 2 }}
                  >
                    <img
                      src={getImageUrl(article.coverImage) || shop1}
                      alt={article.title}
                      crossOrigin="anonymous"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box className="news-content" sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{ backgroundColor: "#2c3e50", color: "white" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "text.secondary",
                        }}
                      >
                        <Visibility fontSize="small" />
                        <Typography variant="caption">
                          {article.views || 0}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {article.title}
                    </Typography>
                    {article.excerpt && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 0.5 }}
                      >
                        {article.excerpt}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No trending articles available</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Trending;
