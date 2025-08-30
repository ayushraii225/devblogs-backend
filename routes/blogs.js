const express = require('express');
const {
  getBlogs,
  createBlog,
  updateBlogStatus,
  getAllBlogsForAdmin,
  getBlog // Importing the new function for fetching a single blog
} = require('../controllers/blogs');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// New route for the admin to get ALL blogs
router
  .route('/all')
  .get(protect, authorize('admin'), getAllBlogsForAdmin);

// Public route for the homepage (gets only approved blogs)
// and for creating a new blog (protected)
router
  .route('/')
  .get(getBlogs)
  .post(protect, createBlog);

// Route for a single blog post.
// It now handles GETting a single post and PUTting updates to it.
router
  .route('/:id')
  .get(getBlog) // This is the new line you needed to add
  .put(protect, authorize('admin'), updateBlogStatus);

module.exports = router;


