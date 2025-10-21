import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid date";
  }
};

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const ProfileDetails = ({ user, statistics }) => {
  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <Grid container spacing={3}>
      {/* Personal Information Card */}
      <Grid item xs={12} md={6}>
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Personal Information
            </Typography>
            <Divider sx={{ my: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <DetailItem label="Email" value={user.email} />
                <DetailItem
                  label="Phone"
                  value={user.phone || "Not provided"}
                />
                <DetailItem
                  label="Date of Birth"
                  value={formatDate(user.dob)}
                />
                <DetailItem label="Role" value={user.role || "User"} />
              </Grid>
              <Grid item xs={12}>
                <DetailItem
                  label="Address"
                  value={user.address || "Not provided"}
                />
                <DetailItem
                  label="Member Since"
                  value={formatDate(user.createdAt)}
                />
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>

      {/* Recent Articles Card */}
      <Grid item xs={12} md={6}>
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Recent Articles
            </Typography>
            {statistics.recentArticles &&
            statistics.recentArticles.length > 0 ? (
              <Box>
                {statistics.recentArticles.map((article, index) => (
                  <Box
                    key={article._id || index}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={() => handleArticleClick(article._id)}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {article.excerpt}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        label={article.status}
                        size="small"
                        color={
                          article.status === "published" ? "success" : "warning"
                        }
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.createdAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {article.views || 0} views
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/news")}
                  sx={{ mt: 2, textDecoration: "none" }}
                >
                  View all articles →
                </Link>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No articles found.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
