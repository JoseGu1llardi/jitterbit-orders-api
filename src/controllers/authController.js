const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Mock user data (in a real application, this would come from a database)
const MOCK_USER = {
  id: 1,
  username: "admin",
  passwordHash: bcrypt.hashSync("password123", 8), // Hashed password
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user exists
    if (username !== MOCK_USER.username) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      MOCK_USER.passwordHash,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: MOCK_USER.id, username: MOCK_USER.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
