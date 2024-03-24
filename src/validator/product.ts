import Joi from "joi";
import {
  CreateProductDto,
  DeleteProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from "types/products/dtos";

export const createProduct = Joi.object<CreateProductDto>({
  name: Joi.string().required(),
  description: Joi.string().min(5).max(200).required(),
  quantity: Joi.number().required(),
  userId: Joi.string().required(),
});

export const updateProduct = Joi.object<UpdateProductDto>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().min(5).max(200).required(),
  quantity: Joi.number().required(),
  userId: Joi.string().required(),
});

export const deleteProduct = Joi.object<DeleteProductDto>({
  id: Joi.string().required(),
});

export const filterProduct = Joi.object<FilterProductsDto>({
  name: Joi.string().optional(),
  search: Joi.string().optional(),
  id: Joi.string().optional(),
  limit: Joi.number().optional(),
  page: Joi.number().optional(),
});
