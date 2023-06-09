import express from 'express';
import Calculation from '../models/calculationModel.js';
import expressAsyncHandler from 'express-async-handler';

const calculationRouter = express.Router();

calculationRouter.get('/', async (req, res) => {
  const calculation = await Calculation.find();
  res.send(calculation);
});

calculationRouter.post(
  '/callendar',
  expressAsyncHandler(async (req, res) => {
    const newCalcution = new Calculation({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      busyHours: req.body.busyHours,
      freeHours: req.body.freeHours,
      remainingDayFinalizer: req.body.remainingDayFinalizer,
      avgHoursPerDay: req.body.avgHoursPerDay,
    });
    const calculation = await newCalcution.save();
    res.send({
      _id: calculation._id,
      startDate: calculation.startDate,
      endDate: calculation.endDate,
      busyHours: calculation.busyHours,
      freeHours: calculation.freeHours,
      remainingDayFinalizer: calculation.remainingDayFinalizer,
      avgHoursPerDay: calculation.avgHoursPerDay,
    });
  })
);

export default calculationRouter;

// const newCalcution = new Calculation({
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//   });

//   const calculation = await newCalcution.save();
//   res.send({
//     _id: calculation._id,
//     startDate: calculation.startDate,
//     endDate: calculation.endDate,
//   });
