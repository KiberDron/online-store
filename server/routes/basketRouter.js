const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.createBasketDevice);
router.get("/:id", basketController.getUserBasket);
router.delete("/", basketController.deleteBasketDevice);

module.exports = router;
