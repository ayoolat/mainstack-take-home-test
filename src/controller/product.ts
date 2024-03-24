import { logger } from "../logs/logger";
import { NextFunction, Request, Response } from "express";
import validator from "../validator/validate";
import { ProductService } from "services/products";
import * as productsValidator from "../validator/product";

import {
  CreateProductDto,
  DeleteProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from "types/products/dtos";
import { PagedList, ResponseDto } from "types/response/dtos";
import { TProduct } from "types/products/products";
import { nextTick } from "process";

export class ProductController {
  constructor(private readonly productService: ProductService) {
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  public async createProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ResponseDto<TProduct>>> {
    try {
      validator(productsValidator.createProduct, request.body),
        logger.debug(
          `Start call to createProduct for user ${request.body.userId}`
        );
      const res = await this.productService.createProduct(
        request.body as CreateProductDto
      );

      logger.debug(`End call to createProduct for user ${request.body.userId}`);
      return response.send(res);
    } catch (err: any) {
      next(err);
    }
  }

  public async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ResponseDto<TProduct>>> {
    try {
      validator(productsValidator.updateProduct, request.body),
        logger.debug(
          `Start call to updateProduct for user ${request.body.userId}`
        );
      const res = await this.productService.updateProduct(
        request.body as UpdateProductDto
      );

      logger.debug(`End call to createProduct for user ${request.body.userId}`);
      return response.send(res);
    } catch (err: any) {
      next(err);
    }
  }

  public async getProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ResponseDto<PagedList<TProduct[]>>>> {
    try {
      validator(productsValidator.filterProduct, request.body),
        logger.debug(`Start call to getProducts`);
      const res = await this.productService.getProducts(
        request.query as unknown as FilterProductsDto
      );

      logger.debug(`End call to getProducts`);
      return response.send(res);
    } catch (err: any) {
      next(err);
    }
  }

  public async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<ResponseDto<TProduct>>> {
    try {
      validator(productsValidator.deleteProduct, request.params),
        logger.debug(
          `Start call to deleteProduct for user ${request.body.userId}`
        );
      const res = await this.productService.deleteProduct(
        request.params as unknown as DeleteProductDto
      );

      logger.debug(`End call to deleteProduct for user ${request.body.userId}`);
      return response.send(res);
    } catch (err: any) {
      next(err);
    }
  }
}
