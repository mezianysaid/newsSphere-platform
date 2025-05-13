import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, clearErrors } from "../../store/actions/productActions";
import { CREATE_PRODUCT_RESET } from "../../store/constants/productConstants";
import "./CreateProduct.scss";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.products || {}
  );

  const initializeFormData = {
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
    productLink: "",
  };

  const [formData, setFormData] = useState(initializeFormData);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState([]);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty",
    "Toys & Games",
    "Food & Beverages",
    "Health",
    "Automotive",
    "Others",
  ];

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }

    if (success) {
      setTimeout(() => {
        dispatch({ type: CREATE_PRODUCT_RESET });
        navigate("/admin/addProduct");
      }, 2000);
    }
  }, [dispatch, error, success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price (greater than 0)";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.productLink.trim()) {
      newErrors.productLink = "Product link is required";
    } else if (!isValidUrl(formData.productLink)) {
      newErrors.productLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!validateForm()) {
        return;
      }

      const productData = new FormData();

      // Append basic fields with proper validation
      productData.append("name", formData.name.trim());
      productData.append("description", formData.description.trim());
      productData.append("price", Number(formData.price).toString());
      productData.append("category", formData.category);
      productData.append("productLink", formData.productLink.trim());

      // Append images only if they exist
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          if (image instanceof File) {
            productData.append("images", image);
          }
        });
      }

      await dispatch(createProduct(productData));
      setFormData(initializeFormData);
      setImagePreview([]);
    } catch (err) {
      dispatch({
        type: CREATE_PRODUCT_RESET,
        payload: err.message || "Error creating product",
      });
    }
  };

  return (
    <Box className="create-product">
      <Container maxWidth="lg">
        <Paper className="form-container">
          <Box className="form-header">
            <IconButton
              onClick={() => navigate("/admin/listProducts")}
              className="back-button"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1">
              Create New Product
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="alert">
              Product created successfully!
            </Alert>
          )}

          {Object.keys(errors).length > 0 && (
            <Alert severity="error" className="alert">
              <Typography variant="subtitle1" gutterBottom>
                Please fix the following errors:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" className="section-title">
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <Typography color="error" variant="caption">
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Link"
                  name="productLink"
                  value={formData.productLink}
                  onChange={handleChange}
                  required
                  error={!!errors.productLink}
                  helperText={errors.productLink}
                  placeholder="https://amzn.to/..."
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  error={!!errors.price}
                  helperText={errors.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography variant="h6" className="section-title">
                  Product Images
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  className="upload-button"
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>

              {imagePreview.length > 0 && (
                <Grid item xs={12}>
                  <Box className="image-preview">
                    {imagePreview.map((url, index) => (
                      <img key={index} src={url} alt={`Preview ${index + 1}`} />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? "Creating..." : "Create Product"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateProduct;
