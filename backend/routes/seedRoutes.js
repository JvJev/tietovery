import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import Calculation from '../models/calculationModel.js';

const seedRouter = express.Router();


seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  await Calculation.deleteMany({});
  const createdCalculations = await Calculation.insertMany(data.calculations);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers, createdCalculations });
});
export default seedRouter;