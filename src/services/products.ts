import {
  CreateProductDto,
  DeleteProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from "../types/products/dtos";
import ProductModel from "../models/products";
import { ResponseService } from "./response";
import { IProduct, TProduct } from "../types/products/products";
import { PagedList, ResponseDto } from "../types/response/dtos";
import { NotFound } from "../middlewares/errorHandler";
import mongoose from "mongoose";

export class ProductService {
  constructor() {
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  public async createProduct(
    payload: CreateProductDto
  ): Promise<ResponseDto<TProduct>> {
    const product = await new ProductModel(payload).save();
    if (!product) throw new Error("An error occurred while creating product");

    return ResponseService.printResponse<TProduct>(
      201,
      "Product successfully created",
      product
    );
  }

  public async deleteProduct(
    payload: DeleteProductDto
  ): Promise<ResponseDto<TProduct>> {
    const product = await ProductModel.findByIdAndUpdate(
      payload.id,
      {
        $deleted: true,
      },
      { new: true }
    );

    if (!product) throw new NotFound("Product not found!");

    return ResponseService.printResponse<TProduct>(
      201,
      "Product successfully retrieved",
      product
    );
  }

  public async updateProduct(
    payload: UpdateProductDto
  ): Promise<ResponseDto<TProduct>> {
    const product = await ProductModel.findByIdAndUpdate(payload.id, payload, {
      new: true,
    });

    if (!product) throw new NotFound("Product not found!");

    return ResponseService.printResponse<TProduct>(
      200,
      "Product successfully updated",
      product
    );
  }

  public async getProduct(
    payload: DeleteProductDto
  ): Promise<ResponseDto<TProduct>> {
    const product = await ProductModel.findById(
      payload.id as mongoose.ObjectId
    );

    if (!product) throw new NotFound("Product not found!");

    return ResponseService.printResponse<TProduct>(
      201,
      "Product successfully retrieved",
      product
    );
  }

  public async getProducts(
    payload: FilterProductsDto
  ): Promise<ResponseDto<PagedList<TProduct[]>>> {
    let match:
      | IProduct
      | mongoose.RootQuerySelector<IProduct>
      | mongoose.UpdateQuery<IProduct> = { deleted: false };

    if (payload.search) {
      match["$or"] = [
        { name: new RegExp(payload.search, "i") },
        { description: new RegExp(payload.search, "i") },
      ];
    }
    if (payload.name) {
      match.name = payload.name;
    }
    if (payload.id) {
      match._id = payload.id;
    }

    const products = await ProductModel.find(match)
      .sort({ createdAt: -1 })
      .skip(((payload.page || 1) - 1) * (payload.limit || 0))
      .limit(payload.limit);

    const pagedList = new PagedList<TProduct[]>(
      payload.page,
      payload.limit,
      products
    );
    pagedList.total = await ProductModel.countDocuments(match);

    if (!products) throw new NotFound("Product not found!");

    return ResponseService.printResponse<PagedList<TProduct[]>>(
      200,
      "Products successfully updated",
      pagedList
    );
  }
}
