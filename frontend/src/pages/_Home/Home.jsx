import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import {
  ShoppingCart,
  Star,
  LocalOffer,
  FlashOn,
  TrendingUp,
  Category,
} from "@mui/icons-material";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";

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
    title: "New Collection",
    description: "Discover our latest arrivals",
  },
  {
    id: 2,
    image: shop2,
    title: "Special Offers",
    description: "Up to 50% off on selected items",
  },
  {
    id: 3,
    image: shop3,
    title: "Trending Now",
    description: "Shop the most popular items",
  },
  {
    id: 4,
    image: shop4,
    title: "Limited Time",
    description: "Don't miss out on these deals",
  },
  {
    id: 5,
    image: shop5,
    title: "Featured Products",
    description: "Check out our best sellers",
  },
];

// Featured Categories Data
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: elec2,
    count: "120+ Products",
  },
  {
    id: 2,
    name: "Fashion & Beauty",
    image: fash1,
    count: "200+ Products",
  },
  {
    id: 3,
    name: "Home & Living",
    image: home2,
    count: "150+ Products",
  },
  {
    id: 4,
    name: "Sports",
    image: spor1,
    count: "80+ Products",
  },
];

// Special Offers Data
const specialOffers = [
  {
    id: 1,
    title: "Flash Sale",
    description: "Up to 50% off on Electronics",
    image: sale2,
    endDate: "2024-03-25",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Latest Fashion Collection",
    image: arriv2,
    endDate: "2024-03-30",
  },
];

const Home = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get products from Redux store
  const { products, loading } = useSelector((state) => state.products);

  // Get favorite items to check if a product is already in favorites
  // const favoriteItems = useSelector((state) => state.favorites.items);

  // Get featured products (first 4 products or fewer if less than 4)

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // First, create a utility function to shuffle arrays (can be in a separate file)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  // Inside your component
  const shuffledProducts = useMemo(() => {
    return shuffleArray(products);
  }, [products]); // Only reshuffles when featuredProducts changes

  const featuredProducts = shuffledProducts?.slice(0, 4) || [];
  useEffect(() => {
    // Fetch products if not already loaded
    if (!products || products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch]);

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

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" className="hero-title">
                Discover Amazing Products at Great Prices
              </Typography>
              <Typography variant="h5" className="hero-subtitle">
                Shop the latest trends with exclusive discounts
              </Typography>
              <Box className="hero-buttons">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  className="shop-now-btn"
                  onClick={() => handleNavigationClick("/products")}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Category />}
                  className="browse-categories-btn"
                  onClick={() => handleNavigationClick("/categories")}
                >
                  Browse Categories
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="hero-carousel">
                {heroImages.map((slide, index) => (
                  <Box
                    key={slide.id}
                    className={`carousel-slide ${
                      index === currentSlide ? "active" : ""
                    }`}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: index === currentSlide ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  >
                    <img src={slide.image} alt={slide.title} />
                    <Box className="carousel-content">
                      <Typography variant="h4">{slide.title}</Typography>
                      <Typography variant="h6">{slide.description}</Typography>
                    </Box>
                  </Box>
                ))}
                <Box className="carousel-indicators">
                  {heroImages.map((_, index) => (
                    <Box
                      key={index}
                      className={`indicator ${
                        index === currentSlide ? "active" : ""
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="lg" className="section-container">
        <Box className="section-header">
          <Typography variant="h2">Shop by Category</Typography>
          <Button
            variant="text"
            onClick={() => handleNavigationClick("/categories")}
            endIcon={<TrendingUp />}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Card
                className="category-card"
                onClick={() => handleNavigationClick(`/categories`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offers */}
      <Container maxWidth="lg" className="section-container">
        <Box className="section-header">
          <Typography variant="h2">Special Offers</Typography>
          <Button variant="text" endIcon={<FlashOn />}>
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {specialOffers.map((offer) => (
            <Grid item xs={12} md={6} key={offer.id}>
              <Card className="offer-card">
                <CardMedia
                  component="img"
                  height="300"
                  image={offer.image}
                  alt={offer.title}
                />
                <CardContent className="offer-content">
                  <Typography variant="h4">{offer.title}</Typography>
                  <Typography variant="h6">{offer.description}</Typography>
                  <Button
                    variant="contained"
                    className="offer-button"
                    endIcon={<LocalOffer />}
                    onClick={() => handleNavigationClick("/products")}
                  >
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="lg" className="section-container">
        <Box className="section-header">
          <Typography variant="h2">Featured Products</Typography>
          <Button
            variant="text"
            endIcon={<Star />}
            onClick={() => handleNavigationClick("/products")}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {loading ? (
            // Show loading state
            <Grid item xs={12}>
              <Typography>Loading products...</Typography>
            </Grid>
          ) : featuredProducts.length > 0 ? (
            // Show featured products
            featuredProducts.map((product) => (
              <Grid item xs={6} md={3} key={product._id}>
                <Card
                  className="product-card"
                  onClick={() =>
                    handleNavigationClick(`/product/${product._id}`)
                  }
                >
                  <Box className="product-image">
                    <img
                      src={
                        process.env.REACT_APP_API_URL + product.images?.[0] ||
                        "../../assets/images/home1.jpg"
                      }
                      alt={product.name}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" className="product-name">
                      {product.name}
                    </Typography>
                    <Box className="product-rating">
                      <Rating
                        value={product.rating || 0}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                    <Box className="product-price">
                      <Typography variant="h6" color="primary">
                        ${product.price}
                      </Typography>
                      {product.discount > 0 && (
                        <Chip
                          label={`${product.discount}% OFF`}
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>
                    {product.isNew && (
                      <Chip
                        label="New"
                        color="success"
                        size="small"
                        className="new-badge"
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            // Show empty state
            <Grid item xs={12}>
              <Typography>No featured products available</Typography>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Footer
      
      <Footer />
      */}
    </Box>
  );
};

export default Home;
