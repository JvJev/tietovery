import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { toast } from 'react-toastify';


export default function CalendarPage() {
  const [busyHours, setBusyHours] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [otherBusyHours, setOtherBusyHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/api/calculations/callendar', {
        startDate,
        endDate,
        busyHours,
      });

      console.log('Data posted to the server:', response.data);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

//   const newDate =endDate.replace(/-/g,'')
//   console.log(parseInt(newDate))
//   const dateArray = Array.from(newDate, Number);
//   console.log(dateArray)
//   const onlyYear = dateArray.slice(0,4);
//   const onlyYear1num = parseInt(onlyYear.join('',10));
//   console.log(onlyYear1num)
//   const onlyMonth = dateArray.slice(4,6);
//   const onlyMonth1num = parseInt(onlyMonth.join('',10));
//   console.log(onlyMonth1num)
//   const onlyDay = dateArray.slice(6,8);
//   const onlyDay1num = parseInt(onlyDay.join('',10));
//   console.log(onlyDay1num)

const parseDate = (dateString) => {
    const newDate = dateString.replace(/-/g, '');
    const dateArray = Array.from(newDate, Number);
    return dateArray;
  };

  const freeHours = 24 - sleepHours - otherBusyHours;
  const onlyYearStart = parseInt(parseDate(startDate).slice(0, 4).join(''), 10);
  const onlyMonthStart = parseInt(parseDate(startDate).slice(4, 6).join(''), 10);
  const onlyDayStart = parseInt(parseDate(startDate).slice(6, 8).join(''), 10);
  const onlyYearEnd = parseInt(parseDate(endDate).slice(0, 4).join(''), 10);
  const onlyMonthEnd = parseInt(parseDate(endDate).slice(4, 6).join(''), 10);
  const onlyDayEnd = parseInt(parseDate(endDate).slice(6, 8).join(''), 10);
console.log(onlyYearStart, onlyMonthStart, onlyDayStart, onlyYearEnd,onlyMonthEnd, onlyDayEnd)

const remainingYearsCalculator = onlyYearEnd - onlyYearStart;
const remainingMonthsCalculator = onlyMonthEnd - onlyMonthStart;
const remainingDaysCalculator = onlyDayEnd - onlyDayStart;
console.log(remainingYearsCalculator, remainingMonthsCalculator, remainingDaysCalculator)

const availablePhDhoursPerDay = (freeHours * remainingDaysCalculator);
const avgHoursPerDay =
freeHours < availablePhDhoursPerDay
    ? toast.error('You will not complete your phD in time. Rethink your schedule.')
    : busyHours / remainingDaysCalculator;


console.log(availablePhDhoursPerDay, avgHoursPerDay)




  return (
    <div>
      <h1>Calendar page</h1>
       
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="busyHours">
          <Form.Label>How many hours phD should take to complete?</Form.Label>
          <Form.Control
            type="number"
            min={0}
            required
            value={busyHours}
            onChange={(e) => setBusyHours(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="sleepHours">
          <Form.Label>How many you sleep per day?</Form.Label>
          <Form.Control
            type="number"
            max={24}
            min={0}
            required
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="otherBusyHours">
          <Form.Label>Busy hours per day on other activities</Form.Label>
          <Form.Control
            type="number"
            max={24}
            min={0}
            required
            value={otherBusyHours}
            onChange={(e) => setOtherBusyHours(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selectedStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selectedEndDate">
          <Form.Label>End Date (deadline)</Form.Label>
          <Form.Control
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Calculate</Button>
      </Form>
    </div>
  );
}
