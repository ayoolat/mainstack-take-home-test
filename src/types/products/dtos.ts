import mongoose from "mongoose";

export class CreateProductDto {
  public name: string;
  public quantity: string;
  public description: string;
  public userId: string;
}

export class UpdateProductDto extends CreateProductDto {
  public id: string | mongoose.ObjectId;
}

export class FilterProductsDto {
  public id: string | mongoose.ObjectId;
  public name: string;

  public search: string;

  public limit: number;
  public page: number;
}

export class DeleteProductDto {
  public id: string | mongoose.ObjectId;
}
