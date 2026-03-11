import mongoose, { Schema } from "mongoose";

export interface IProduct {
  description?: string;
  image: {
    fileName: string;
    originalName: string;
  };
  title: string;
  category: string;
  price: number | null;
}

const productSchema = new Schema<IProduct>({
  description: {
    type: String,
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  title: {
    minlength: 2,
    maxlength: 30,
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

export default mongoose.model<IProduct>("product", productSchema);
