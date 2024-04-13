const MSP = require("../models/MSPvalues"); // Assuming this path is correct
const express = require("express");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.post("/add", async (req, res) => {
  try {
    const { healthCareName, healthCareID, email, password } = req.body;
    const ins = new MSP({
      healthCareName,
      healthCareID,
      email,
      password,
    });

    const result = await ins.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

module.exports = router;
