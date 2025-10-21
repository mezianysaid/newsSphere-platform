import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import { fetchArticle } from "../../store/actions/articleActions";
import { getImageUrl } from "../../utils/imageUtils";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";

const ArticleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticle(id));
    }
  }, [dispatch, id]);

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

  if (!article) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          Article not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Paper
          elevation={0}
          sx={{ p: 2, mb: 3, backgroundColor: "transparent" }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Home
            </RouterLink>
            <RouterLink
              to="/news"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              News
            </RouterLink>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>
              {article.title}
            </Typography>
          </Breadcrumbs>
        </Paper>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              {/* Cover Image */}
              {article.coverImage && (
                <CardMedia
                  component="img"
                  height="400"
                  image={getImageUrl(article.coverImage)}
                  alt={article.title}
                  sx={{
                    objectFit: "cover",
                    background:
                      "linear-gradient(45deg, #f0f0f0 25%, transparent 25%)",
                  }}
                />
              )}

              <CardContent sx={{ p: 4 }}>
                {/* Article Header */}
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "#1a1a1a",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    {article.title}
                  </Typography>

                  {/* Author and Meta Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {article.author}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CategoryIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {article.category}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Share">
                        <IconButton sx={{ color: "#ee5a24" }}>
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save">
                        <IconButton sx={{ color: "#ee5a24" }}>
                          <BookmarkBorderIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />
                </Box>

                {/* Article Content */}
                <Box
                  sx={{
                    typography: "body1",
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                    color: "#333",
                    "& p": {
                      mb: 2,
                    },
                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                      mt: 3,
                      mb: 2,
                      fontWeight: 600,
                      color: "#1a1a1a",
                    },
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article.content?.replace(/\n/g, "<br/>"),
                    }}
                  />
                </Box>

                {/* Tags */}
                {article.tags?.length > 0 && (
                  <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {article.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={tag}
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            fontWeight: 500,
                            "&:hover": {
                              backgroundColor: "#1976d2",
                              color: "white",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Card elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Article Info
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon sx={{ color: "#ee5a24" }} />
                      <Typography variant="body2">
                        <strong>Author:</strong> {article.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CategoryIcon sx={{ color: "#ee5a24" }} />
                      <Typography variant="body2">
                        <strong>Category:</strong> {article.category}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTimeIcon sx={{ color: "#ee5a24" }} />
                      <Typography variant="body2">
                        <strong>Published:</strong>{" "}
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <IconButton
                    
                      sx={{
                        justifyContent: "flex-start",
                        color: "#ee5a24" ,
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <ShareIcon sx={{ mr: 1 }} />
                      Share Article
                    </IconButton>
                    <IconButton
                     
                      sx={{
                        justifyContent: "flex-start",
                        color: "#ee5a24",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <BookmarkBorderIcon sx={{ mr: 1 }} />
                      Save for Later
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleDetails;
