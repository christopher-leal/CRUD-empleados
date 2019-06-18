const express = require("express");
const router = express.Router();
router.get("/users", (req, res) => {
  res.json([
    {
      id: 1,
      username: "samsepi0l"
    },
    {
      id: 2,
      username: "D0loresH4ze"
    }
  ]);
});

module.exports = router;
