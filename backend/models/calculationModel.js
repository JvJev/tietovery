import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Calculation = mongoose.model('Calculation', calculationSchema);
export default Calculation;
