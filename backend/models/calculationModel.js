import mongoose from 'mongoose';

const calculationSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    busyHours: { type: Number, required: true },
    freeHours: { type: Number, required: true },
    remainingDayFinalizer: { type: Number, required: true },
    avgHoursPerDay: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Calculation = mongoose.model('Calculation', calculationSchema);
export default Calculation;
