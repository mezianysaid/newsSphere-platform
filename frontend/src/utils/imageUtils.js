/**
 * Utility function to handle image URLs
 * @param {string} imageUrl - The image URL from the database
 * @returns {string} - The properly formatted image URL
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If it's already a full URL (starts with http/https), return as is
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // If it's a relative path, prepend the API URL
  return `${process.env.REACT_APP_API_URL}${imageUrl}`;
};

/**
 * Utility function to get optimized image URL with size parameters
 * @param {string} imageUrl - The image URL from the database
 * @param {Object} options - Options for image optimization
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.fit - Fit mode (crop, fill, etc.)
 * @returns {string} - The optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
  const baseUrl = getImageUrl(imageUrl);
  if (!baseUrl) return null;

  // For Unsplash images, we can add size parameters
  if (baseUrl.includes("unsplash.com")) {
    const { width = 800, height = 400, fit = "crop" } = options;
    return `${baseUrl}&w=${width}&h=${height}&fit=${fit}`;
  }

  return baseUrl;
};
