const Blog = require('../models/Blog');

// @desc    Get all approved blogs for the public homepage
// @route   GET /api/v1/blogs
// @access  Public
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: 'approved' }).populate('author', 'name');
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Get single blog by ID
// @route   GET /api/v1/blogs/:id
// @access  Public
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');

    // Check if a blog was found
    if (!blog) {
      return res.status(404).json({ success: false, msg: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    // This can catch errors like an invalidly formatted ObjectId
    res.status(400).json({ success: false, msg: 'Error processing request' });
  }
};

// @desc    Get all blogs for the admin dashboard
// @route   GET /api/v1/blogs/all
// @access  Private/Admin
exports.getAllBlogsForAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Create a blog
// @route   POST /api/v1/blogs
// @access  Private
exports.createBlog = async (req, res, next) => {
  try {
    // Add user from protect middleware to the body
    req.body.author = req.user.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// @desc    Update blog status (for admins)
// @route   PUT /api/v1/blogs/:id
// @access  Private/Admin
exports.updateBlogStatus = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, msg: 'Blog not found' });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true
    }).populate('author', 'name');

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

