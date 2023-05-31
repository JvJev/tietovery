import express from 'express';
import Calculation from '../models/calculationModel.js';
import expressAsyncHandler from 'express-async-handler';

const calculationRouter = express.Router();

calculationRouter.post(
  '/callendar',
  expressAsyncHandler(async (req, res) => {
    const newCalcution = new Calculation({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    const calculation = await newCalcution.save();
    res.send({
      _id: user._id,
      startDate: calculation.startDate,
      endDate: calculation.endDate,
    });
  })
);

export default calculationRouter;
