import { Router } from "express";

import productRoutes from "./products";
import authRoutes from "./auth";

export default (router: Router) => {
  productRoutes(router);
  authRoutes(router);
};
