import mongoose from "mongoose";

export interface IProduct {
  _id: mongoose.ObjectId;
  id: string;
  name: string;
  quantity: number;
  description: number;
  deleted: boolean;
}

export type TProduct = mongoose.Document &
  IProduct & {
    jsonify(): Record<string, any>;
  };
