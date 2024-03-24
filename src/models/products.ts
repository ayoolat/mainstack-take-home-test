import mongoose from "mongoose";
import { TProduct } from "types/products/products";

const schema = new mongoose.Schema<TProduct>(
  {
    name: {
      unique: true,
      $type: String,
      required: true,
    },
    description: {
      $type: String,
      required: true,
      maxlength: 500,
    },
    quantity: {
      $type: Number,
      required: true,
    },
    deleted: {
      $type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    typeKey: "$type",
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.deleted;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.deleted;
      },
    },
  }
);

/**
 * Returns a json object of the account
 * @param
 * @returns {Record<string, any>}
 *
 */
schema.methods.jsonify = function (): Record<string, any> {
  return {
    id: this._id,
    ...this.toJSON(),
  };
};

export default mongoose.model<TProduct>("product", schema);
