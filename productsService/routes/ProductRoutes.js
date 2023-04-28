const {
  createProduct,
  findAllProducts,
  findProduct,
  deleteProduct,
  updatedProduct,
  findProductWithUserSchema,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/", createProduct);
router.get("/", findAllProducts);
router.get("/:id", findProduct);
router.get("/productUser/:id", findProductWithUserSchema);
router.delete("/delete/:id", deleteProduct);
router.put("/updates/:id", updatedProduct);

module.exports = router;
