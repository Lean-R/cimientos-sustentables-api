const { Router } = require("express");
const router = Router();
const obrasRouter = require("./obras.routes");

router.use("/obras", obrasRouter);

module.exports = router;
