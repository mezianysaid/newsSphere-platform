import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../utils/imageUtils";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import {
  Article,
  TrendingUp,
  Category,
  Schedule,
  Person,
  Visibility,
  AccessTime,
  BookmarkBorder,
  Share,
  MoreVert,
} from "@mui/icons-material";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../store/actions/articleActions";

// import images
import spor1 from "../../assets/images/spor1.jpg";
// import spo2 from "../../assets/images/spo2.jpg";
// import elec1 from "../../assets/images/elec1.jpg";
import elec2 from "../../assets/images/elec2.jpg";
// import elec3 from "../../assets/images/elec3.jpg";
// import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import shop1 from "../../assets/images/shop1.jpg";
import shop2 from "../../assets/images/shop2.jpg";
import shop3 from "../../assets/images/shop3.jpg";
import shop4 from "../../assets/images/shop4.jpg";
import shop5 from "../../assets/images/shop5.jpg";
// import sale1 from "../../assets/images/sale1.jpg";
import sale2 from "../../assets/images/sale2.jpg";
import fash1 from "../../assets/images/fash1.jpg";
// import arriv1 from "../../assets/images/arriv1.jpg";
import arriv2 from "../../assets/images/arriv2.jpg";

// Hero carousel images
const heroImages = [
  {
    id: 1,
    image: shop1,
    title: "Breaking News",
    description: "Stay updated with the latest developments",
  },
  {
    id: 2,
    image: shop2,
    title: "In-Depth Analysis",
    description: "Comprehensive coverage of important stories",
  },
  {
    id: 3,
    image: shop3,
    title: "Expert Opinions",
    description: "Insights from industry leaders",
  },
  {
    id: 4,
    image: shop4,
    title: "Global Coverage",
    description: "News from around the world",
  },
  {
    id: 5,
    image: shop5,
    title: "Trending Topics",
    description: "What everyone is talking about",
  },
];

// Mock Featured Articles for Testing
const mockFeaturedArticles = [
  {
    _id: "mock-1",
    title:
      "AI Breakthrough: Google's New Language Model Shows 40% Improvement in Reasoning",
    excerpt:
      "Google researchers announce a major advancement in artificial intelligence that could revolutionize how we interact with technology.",
    author: "Sarah Chen",
    category: "Technology",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    views: 15420,
    coverImage: null, // Will use placeholder
  },
  {
    _id: "mock-2",
    title:
      "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
    excerpt:
      "World leaders commit to unprecedented measures to combat climate change, setting new targets for 2030.",
    author: "Michael Rodriguez",
    category: "Politics",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    views: 8930,
    coverImage: null,
  },
  {
    _id: "mock-3",
    title: "Stock Markets Hit Record Highs as Tech Sector Surges",
    excerpt:
      "Major indices close at all-time highs following strong earnings reports from leading technology companies.",
    author: "Jennifer Walsh",
    category: "Business",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    views: 12350,
    coverImage: null,
  },
  {
    _id: "mock-4",
    title: "Olympic Games 2024: New Records Set in Swimming and Track Events",
    excerpt:
      "Athletes from around the world break multiple world records in an exciting day of competition.",
    author: "David Thompson",
    category: "Sports",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    views: 18760,
    coverImage: null,
  },
];

// Featured Stories Data
const featuredStories = [
  {
    id: 1,
    title: "Breaking News Alert",
    description: "Major developments in global markets",
    image: sale2,
    category: "Business",
  },
  {
    id: 2,
    title: "Technology Update",
    description: "Latest innovations changing the world",
    image: arriv2,
    category: "Technology",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get articles from Redux store
  const { articles, loading } = useSelector((state) => state.articles);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get latest articles (first 6 articles or mock data)
  const latestArticles = useMemo(() => {
    if (articles && articles.length > 0) {
      return articles.slice(0, 6);
    }
    // Return mock articles when no real data
    return mockFeaturedArticles.slice(0, 6);
  }, [articles]);

  // Get trending articles (shuffled for demo)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const trendingArticles = useMemo(() => {
    if (articles && articles.length > 0) {
      return shuffleArray(articles).slice(0, 4);
    }
    // Return shuffled mock articles when no real data
    return shuffleArray(mockFeaturedArticles).slice(0, 4);
  }, [articles]);

  // Hero simplified: no featured article card needed

  useEffect(() => {
    // Fetch articles if not already loaded
    if (!articles || articles.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === heroImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNavigationClick = (path) => {
    navigate(path);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffInHours = Math.floor((now - articleDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Box className="home-page">
      {/* Breaking News Banner */}
      <Box className="breaking-news-banner">
        <Container maxWidth="lg">
          <Box className="breaking-content">
            <Chip
              label="BREAKING"
              color="error"
              size="small"
              className="breaking-chip"
            />
            <Typography variant="body1" className="breaking-text">
              Stay updated with the latest breaking news and developments from
              around the world
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box className="hero-section">
        {/* Background (video removed) */}
        <Box className="hero-video-background"></Box>

        <Container maxWidth="lg">
          <Box className="hero-content">
            {/* Modern, focused hero */}
            <Box className="hero-text modern">
              <Typography variant="overline" className="hero-eyebrow">
                Trusted journalism
              </Typography>
              <Typography variant="h1" className="hero-title">
                Stay informed.
                <span className="gradient-text"> Act with clarity.</span>
              </Typography>
              <Typography variant="h6" className="hero-subtitle">
                Real-time reporting, expert analysis, and trends that matter.
              </Typography>
              <Box className="hero-actions">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Article />}
                  className="primary-btn"
                  onClick={() => handleNavigationClick("/news")}
                >
                  Read latest
                </Button>
                <Button
                  variant="text"
                  size="large"
                  startIcon={<TrendingUp />}
                  className="secondary-link"
                  onClick={() => handleNavigationClick("/news")}
                >
                  Explore trends
                </Button>
              </Box>
              <Box className="hero-stats">
                <Box className="stat">
                  <Visibility fontSize="small" />
                  <span>120k+ monthly readers</span>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="stat-divider"
                />
                <Box className="stat">
                  <Article fontSize="small" />
                  <span>8k+ articles</span>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="stat-divider"
                />
                <Box className="stat">
                  <Category fontSize="small" />
                  <span>15+ categories</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Latest News Section */}
      <Container maxWidth="lg" className="section-container">
        <Box className="section-header">
          <Typography variant="h4" className="section-title">
            Latest News
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleNavigationClick("/news")}
            endIcon={<Article />}
            className="view-all-btn"
          >
            View All Articles
          </Button>
        </Box>

        {loading ? (
          <Box className="loading-state">
            <Typography variant="h6">Loading latest articles...</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {latestArticles.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <Card
                  className="news-card"
                  onClick={() =>
                    handleNavigationClick(`/article/${article._id}`)
                  }
                >
                  <Box className="news-image">
                    {article.coverImage ? (
                      <img
                        src={getImageUrl(article.coverImage)}
                        alt={article.title}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <img
                        src={[shop1, shop2, shop3, shop4, shop5][index % 5]} // Use different placeholder images
                        alt={article.title}
                      />
                    )}
                    <Box className="news-overlay">
                      <Chip
                        label={article.category}
                        size="small"
                        color="primary"
                        className="news-category"
                      />
                    </Box>
                  </Box>
                  <CardContent className="news-content">
                    <Typography variant="h6" className="news-title">
                      {article.title}
                    </Typography>
                    {article.excerpt && (
                      <Typography variant="body2" className="news-excerpt">
                        {article.excerpt}
                      </Typography>
                    )}
                    <Box className="news-meta">
                      <Box className="news-author">
                        <Person fontSize="small" />
                        <Typography variant="caption">
                          {article.author}
                        </Typography>
                      </Box>
                      <Box className="news-stats">
                        <AccessTime fontSize="small" />
                        <Typography variant="caption">
                          {formatTimeAgo(article.publishedAt)}
                        </Typography>
                        <Visibility fontSize="small" />
                        <Typography variant="caption">
                          {article.views || 0}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Newsletter Subscription */}
      <Box className="newsletter-section">
        <Container maxWidth="md">
          <Paper className="newsletter-card">
            <Box className="newsletter-content">
              <Typography variant="h4" className="newsletter-title">
                Stay Updated
              </Typography>
              <Typography variant="body1" className="newsletter-subtitle">
                Get the latest news delivered directly to your inbox
              </Typography>
              <Box className="newsletter-form">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Article />}
                  onClick={() => handleNavigationClick("/news")}
                  className="subscribe-btn"
                >
                  Subscribe to Newsletter
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
