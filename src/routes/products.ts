import express, { Router, Request, Response, NextFunction } from "express";
import { ProductService } from "../services/products";
import { ProductController } from "../controller/product";
import { Authenticate } from "../middlewares/authenticate";

const router = express.Router();
const productService = new ProductService();
const authenticator = new Authenticate();
const productController: ProductController = new ProductController(
  productService
);

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  productController.getProducts(req, res, next);
});

router.post(
  "/",
  authenticator.authenticator,
  (req: Request, res: Response, next: NextFunction) => {
    productController.createProduct(req, res, next);
  }
);

router.put(
  "/",
  authenticator.authenticator,
  (req: Request, res: Response, next: NextFunction) => {
    productController.updateProduct(req, res, next);
  }
);

router.delete(
  "/:id",
  authenticator.authenticator,
  (req: Request, res: Response, next: NextFunction) => {
    productController.deleteProduct(req, res, next);
  }
);

export default (app: Router) => app.use("/product", router);
