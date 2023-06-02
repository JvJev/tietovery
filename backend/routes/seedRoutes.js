import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import Calculation from '../models/calculationModel.js';

const seedRouter = express.Router();


seedRouter.get('/', async (req, res) => {
  await Calculation.deleteMany({});
  const createdCalculations = await Calculation.insertMany(data.calculations);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers, createdCalculations });
});
export default seedRouter;