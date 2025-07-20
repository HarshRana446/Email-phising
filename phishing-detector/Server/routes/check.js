const express = require("express");
const router = express.Router();
const { checkPhishingEmail } = require("../utils/gemini");
const verifyToken = require("../Middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { emailText } = req.body;

    if (!emailText) {
      return res.status(400).json({ msg: "Email content is required" });
    }

    const result = await checkPhishingEmail(emailText);
    res.json({ result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
