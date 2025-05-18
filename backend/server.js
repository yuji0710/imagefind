
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const twilio = require("twilio");
const app = express();
const PORT = 5000;
const router =express.Router();
// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://imagefind.onrender.com/", // Allow frontend running on port 3000
  methods: ["GET", "POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(router);
// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/imagefind"; 
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1);
  });

// User Schema & Model
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Added
  lastName: { type: String, required: true }, // Added
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Added
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "seller", "admin"], default: "user", required: true },
  cart: [{ type:String, ref: "Product" }] ,
  wishlist:[{type:String,ref:"product"}] ,// Store product IDs in cart
  history: [{
    date: { type: Date, default: Date.now },
    items: [{ type: String, ref: "Product" }]
  }],
  

});


const User = mongoose.model("User", UserSchema);


// Product Schema & Model
const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  gender: String,
  masterCategory: String,
  subCategory: String,
  articleType: String,
  baseColour: String,
  season: String,
  year: String,
  usage: String,
  productDisplayName: String,
  filename: String,
  link: String,
  image: String, // Added image field if necessary
  price: Number // Added price field if necessary
});

const Product = mongoose.model("Product", ProductSchema,"products");

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email role username history");
    res.json(users); // Sends users as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.get("/api/products/history-id", async (req, res) => {
  try {
    let ids = req.query.ids ? req.query.ids.split(",") : [];

    if (ids.length === 0) {
      return res.json([]);
    }

    // Query using `id` field instead of `_id`
    const products = await Product.find({ id: { $in: ids } });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching products from the database." });
  }
});









app.get("/api/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





app.get("/api/products-by-season", async (req, res) => {
  try {
    const season = req.query.season?.trim();
    console.log(`🔹 Requested season: ${season}`);

    if (!season) return res.json({ products: [] });

    // Fetch random products for the given season
    const products = await Product.aggregate([
      { $match: { season: { $regex: `^${season}$`, $options: "i" } } }, // Case-insensitive match
      { $sample: { size: 200 } }, // Get 50 random products
    ]);

    if (products.length === 0) {
      console.log(`⚠️ No products found for: ${season}`);
    }

    res.json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






app.get("/api/products-by-article", async (req, res) => {
  try {
    const articleType = req.query.article?.trim();
    console.log(`🔹 Requested article type: ${articleType}`);

    if (!articleType) return res.json({ products: [] });

    // Find products by article type (case-sensitive fix)
    const products = await Product.aggregate([
      { $match: { articleType: { $regex: `^${articleType}$`, $options: "i" } } }, // Case-insensitive match
      { $sample: { size: 200 } }, // Get 50 random products
    ]);
    if (products.length === 0) {
      console.log(`⚠️ No products found for: ${articleType}`);
    }

    res.json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.get("/api/products-by-gender", async (req, res) => {
  try {
    const gender = req.query.gender?.trim();
    console.log(`🔹 Requested gender: ${gender}`);

    if (!gender) return res.json({ products: [] });

    // Find products by gender (case-sensitive fix)
    const products = await Product.aggregate([
      { $match: { gender: { $regex: `^${gender}$`, $options: "i" } } }, // Case-insensitive match
      { $sample: { size: 200 } }, // Get 50 random products
    ]);
    if (products.length === 0) {
      console.log(`⚠️ No products found for: ${gender}`);
    }

    res.json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Random Products Route
app.get("/api/random-products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;

  try {
    const totalProducts = await Product.countDocuments();
    const randomSkip = Math.max(0, Math.floor(Math.random() * (totalProducts - limit)));

    const randomProducts = await Product.find()
      .skip(randomSkip)
      .limit(limit)
      .select("id productDisplayName link price masterCategory subCategory baseColour season year usage");

    if (!randomProducts.length) {
      return res.status(404).json({ message: "❌ No products found." });
    }

    res.json({ products: randomProducts, totalPages: Math.ceil(totalProducts / limit) });
  } catch (error) {
    console.error("❌ Error fetching random products:", error);
    res.status(500).json({ message: "❌ Error fetching random products from MongoDB." });
  }
});

app.post("/api/signup", async (req, res) => {
  const { firstName,lastName,email, username, password, role } = req.body;

  if (!firstName|| !lastName || !email || !username || !password || !role) {
    return res.status(400).json({ message: "Username, password, and role are required." });
  }

  if (!["user", "seller", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role. Choose user, seller, or admin." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters, include one uppercase letter, one number, and one special character." });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName,lastName,email, username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "✅ Signup successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server error during signup." });
  }
});

app.get("/api/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    res.json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "❌ Error fetching products from the database." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Username, password, and role are required." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: `Access denied. This user is registered as ${user.role}.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "✅ Login successful", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server error." });
  }
});

// Upload Product Route
app.post("/api/upload-product", async (req, res) => {
  console.log("🔍 Received product data:", req.body); // Debugging log

  if (!req.body) {
    return res.status(400).json({ message: "❌ No data received" });
  }

  const requiredFields = [
    "id", "gender", "masterCategory", "subCategory", "articleType", "baseColour",
    "season", "year", "usage", "productDisplayName", "filename", "link"
  ];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      console.log(`❌ Missing field: ${field}`); // Debugging log
      return res.status(400).json({ message: `Missing field: ${field}` });
    }
  }
  const { id } = req.body;
  try {

    const existingProduct = await Product.findOne({ id });

        if (existingProduct) {
            return res.status(400).json({ message: `❌ Product with ID ${id} already exists.` });
        }


    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "✅ Product successfully added to MongoDB!" });
  } catch (error) {
    console.error("❌ Error saving product:", error);
    res.status(500).json({ message: "❌ Error saving to MongoDB" });
  }
});


app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.q ? req.query.q.toLowerCase() : "";
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  if (!searchTerm) {
    return res.status(400).json({ message: "❌ Please provide a search term." });
  }

  try {
    const words = searchTerm.split(" ").filter(word => word.trim() !== ""); // Split words

    const filteredResults = await Product.find({
      $and: words.map(word => ({
        $or: [
          { productDisplayName: { $regex: `\\b${word}\\b`, $options: "i" } },
          ]
      }))
    })
    .skip(skip)
    .limit(limit)
    .select("id productDisplayName link price gender baseColour");
    
    const total = await Product.countDocuments({ $text: { $search: searchTerm } });

    res.json({ products: filteredResults, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("❌ Error searching MongoDB:", error);
    res.status(500).json({ message: "❌ Error searching MongoDB", error: error.message });
  }
});



app.post("/api/cart/add", async (req, res) => {
  try {
    console.log("received data ",req.body)
    const { username, productId } = req.body;

    if (!productId ) {
      return res.status(400).json({ message: "❌ Invalid product data." });
    }
    const productIdStr = String(productId);
    // Find the user
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }
    if (!user.cart) {
      user.cart = []; // Initialize cart as an empty array if it's undefined
    }

  
      user.cart.push(productIdStr);
      await user.save();
    

    res.json({ message: "✅ Product added to cart!", cart: user.cart });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "❌ Server error." });
  }
});

app.get('/api/cart/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });

     

      if (!user.cart || user.cart.length === 0) {
        return res.json({ message: "🛒 Cart is empty.", products: [] });
      }

       // Fetch products based on string IDs
    const products = await Product.find({ id: { $in: user.cart } });

      // Ensure the response is sent only once
      return res.json({ cart: products });

  } catch (error) {
      console.error('❌ Error fetching cart:', error);

      // Ensure this response only runs if no other response was sent
      if (!res.headersSent) {
          return res.status(500).json({ error: "Internal Server Error" });
      }
  }
});
app.post("/api/cart/remove", async (req, res) => {
  const { username, productId } = req.body;

  if (!username || !productId) {
      return res.status(400).json({ message: "❌ Username and product ID are required." });
  }

  try {
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "❌ User not found." });
      }

      // Filter out the product ID from the cart
      user.cart = user.cart.filter((id) => id !== productId);

      await user.save();
      res.json({ message: "✅ Product removed from cart!", cart: user.cart });
  } catch (error) {
      console.error("❌ Error removing product from cart:", error);
      res.status(500).json({ message: "❌ Server error." });
  }
});

app.use(express.json());



app.post("/api/cart/checkout", async (req, res) => {
  try {
      const { username } = req.body;

      if (!username) {
          return res.status(400).json({ message: "❌ Username is required." });
      }

      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "❌ User not found." });
      }

      if (!user.cart || user.cart.length === 0) {
          return res.status(400).json({ message: "🛒 Cart is empty. Cannot proceed to checkout." });
      }

      // Ensure history exists
      if (!user.history) {
          user.history = [];
      }

      // Move cart items to history
      user.history.push({
          date: new Date(),
          items: [...user.cart], // Store the cart items in history
      });

      // Clear the cart after checkout
      user.cart = [];

      await user.save();

      res.json({ message: "✅ Checkout successful!", history: user.history });
  } catch (error) {
      console.error("❌ Error during checkout:", error);
      res.status(500).json({ message: "❌ Server error during checkout." });
  }
});



// Add product to wishlist
app.post("/api/wishlist/add", async (req, res) => {
  try {
    console.log("Received wishlist data", req.body);
    const { username, productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "❌ Invalid product data." });
    }

    const productIdStr = String(productId);
    let user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "❌ User not found" });

    if (!user.wishlist) user.wishlist = []; // Initialize if undefined

    // Prevent duplicate entries
    if (user.wishlist.includes(productIdStr)) {
      return res.status(400).json({ message: "❌ Product already in wishlist." });
    }
    
    user.wishlist.push(productIdStr);
    await User.updateOne({ username }, { wishlist: user.wishlist }, { runValidators: false });
    // await user.save();

    res.json({message: "✅ Product added to wishlist!", wishlist: user.wishlist });
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
    res.status(500).json({ message: "❌ Server error." });
  }
});

// Fetch wishlist products
app.get("/api/wishlist/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "❌ User not found." });

    if (!user.wishlist || user.wishlist.length === 0) {
      return res.json({ message: "💔 Wishlist is empty.", products: [] });
    }

    const products = await Product.find({ id: { $in: user.wishlist } });
    return res.json({ wishlist: products });
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    res.status(500).json({ message: "❌ Server error." });
  }
});

// Remove product from wishlist
app.post("/api/wishlist/remove", async (req, res) => {
  const { username, productId } = req.body;

  if (!username || !productId) {
    return res.status(400).json({ message: "❌ Username and product ID are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "❌ User not found." });

    user.wishlist = user.wishlist.filter((id) => id !== productId);
    await User.updateOne({ username }, { wishlist: user.wishlist }, { runValidators: false });

    res.json({ message: "✅ Product removed from wishlist!", wishlist: user.wishlist });
  } catch (error) {
    console.error("❌ Error removing product from wishlist:", error);
    res.status(500).json({ message: "❌ Server error." });
  }
});




// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
