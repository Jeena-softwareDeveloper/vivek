import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  url: string;
  caption?: string;
  category?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    url: { type: String, required: true },
    caption: { type: String },
    category: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
