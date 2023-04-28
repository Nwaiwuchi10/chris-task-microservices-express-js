const {
  registerUser,
  loginUser,
  findAllUsers,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", findAllUsers);

module.exports = router;
