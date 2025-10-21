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
  Alert,
  IconButton,
  Chip,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticle,
  clearArticleErrorAction,
} from "../../store/actions/articleActions";
import "./CreateProduct.scss";

const CreateArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.articles || {}
  );

  const initializeFormData = {
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    coverImage: null,
    images: [],
    status: "published",
  };

  const [formData, setFormData] = useState(initializeFormData);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const categories = [
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Travel",
    "Food",
    "Sports",
    "Entertainment",
    "Education",
    "Science",
    "Others",
  ];

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearArticleErrorAction());
      }, 5000);
    }

    if (success) {
      setTimeout(() => {
        navigate("/news");
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

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Article title is required";
    } else if (formData.title.length > 160) {
      newErrors.title = "Title cannot exceed 160 characters";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length > 300) {
      newErrors.excerpt = "Excerpt cannot exceed 300 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    } else if (formData.author.length > 60) {
      newErrors.author = "Author name cannot exceed 60 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!validateForm()) {
        return;
      }

      const articleData = new FormData();

      // Append basic fields with proper validation
      articleData.append("title", formData.title.trim());
      articleData.append("excerpt", formData.excerpt.trim());
      articleData.append("content", formData.content.trim());
      articleData.append("author", formData.author.trim());
      articleData.append("category", formData.category);
      articleData.append("status", formData.status);

      // Append tags
      if (formData.tags.length > 0) {
        formData.tags.forEach((tag) => {
          articleData.append("tags", tag);
        });
      }

      // Append cover image if it exists
      if (formData.coverImage && formData.coverImage instanceof File) {
        articleData.append("coverImage", formData.coverImage);
      }

      // Append images only if they exist
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          if (image instanceof File) {
            articleData.append("images", image);
          }
        });
      }

      await dispatch(createArticle(articleData));
      setFormData(initializeFormData);
      setImagePreview([]);
    } catch (err) {
      console.error("Error creating article:", err);
    }
  };

  return (
    <Box className="create-product">
      <Container maxWidth="lg">
        <Paper className="form-container">
          <Box className="form-header">
            <IconButton
              onClick={() => navigate("/news")}
              className="back-button"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1">
              Create New Article
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="alert">
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className="alert">
              Article created successfully!
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
                  Article Information
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Article Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  error={!!errors.author}
                  helperText={errors.author}
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
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Excerpt */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  error={!!errors.excerpt}
                  helperText={errors.excerpt}
                  placeholder="Brief summary of the article..."
                />
              </Grid>

              {/* Content */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  multiline
                  rows={8}
                  error={!!errors.content}
                  helperText={errors.content}
                  placeholder="Write your article content here..."
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Typography variant="h6" className="section-title">
                  Tags
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Add Tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleTagAdd();
                    }
                  }}
                  placeholder="Type a tag and press Enter"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim()}
                  fullWidth
                >
                  Add Tag
                </Button>
              </Grid>

              {formData.tags.length > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleTagRemove(tag)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography variant="h6" className="section-title">
                  Article Images
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  className="upload-button"
                >
                  Upload Cover Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleCoverImageChange}
                  />
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  className="upload-button"
                >
                  Upload Additional Images
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
                  {loading ? "Creating..." : "Create Article"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateArticle;
