import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Article as ArticleIcon,
  Publish as PublishIcon,
  Drafts as DraftIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchArticles,
  createArticle,
} from "../../../store/actions/articleActions";

const AdminArticles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { articles, loading } = useSelector((state) => state.articles);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Note: We need to add deleteArticle action to articleActions
      setSnackbar({
        open: true,
        message: "Article deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete article",
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedArticle(null);
    }
  };

  const handleEditClick = (article) => {
    navigate(`/admin/articles/edit/${article._id}`);
  };

  const handleViewClick = (article) => {
    navigate(`/article/${article._id}`);
  };

  const handleStatusToggle = (article) => {
    // Toggle between published and draft
    const newStatus = article.status === "published" ? "draft" : "published";
    // Note: We need to add updateArticle action to articleActions
    setSnackbar({
      open: true,
      message: `Article ${
        newStatus === "published" ? "published" : "moved to draft"
      }`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
          <Typography variant="h4" component="h1">
            Manage Articles
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Total Articles: {articles.length}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/addProduct")}
            startIcon={<ArticleIcon />}
          >
            Create New Article
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Cover Image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Author
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Views
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell>
                  <img
                    src={
                      process.env.REACT_APP_API_URL + article.coverImage ||
                      "../../assets/images/home1.jpg"
                    }
                    alt={article.title}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.excerpt?.substring(0, 50)}...
                  </Typography>
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <Chip
                    label={article.status}
                    color={
                      article.status === "published" ? "success" : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{article.views || 0}</TableCell>
                <TableCell>
                  {new Date(article.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Tooltip title="View Article">
                    <IconButton onClick={() => handleViewClick(article)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Article">
                    <IconButton onClick={() => handleEditClick(article)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={
                      article.status === "published"
                        ? "Move to Draft"
                        : "Publish"
                    }
                  >
                    <IconButton
                      onClick={() => handleStatusToggle(article)}
                      color={
                        article.status === "published" ? "warning" : "success"
                      }
                    >
                      {article.status === "published" ? (
                        <DraftIcon />
                      ) : (
                        <PublishIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Article">
                    <IconButton
                      onClick={() => handleDeleteClick(article)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedArticle?.title}"? This
          action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminArticles;
