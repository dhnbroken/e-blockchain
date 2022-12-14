import mongoose from 'mongoose';

const shoesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const ShoesModel = mongoose.model('Shoes', shoesSchema);

export default ShoesModel;
