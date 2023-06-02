import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

export default function CalendarPage() {
  const [busyHours, setBusyHours] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [otherBusyHours, setOtherBusyHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/api/calculations/callendar', {
        startDate,
        endDate,
        busyHours,
        freeHours,
        remainingDayFinalizer,
        avgHoursPerDay,
      });

      console.log('Data posted to the server:', response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const parseDate = (dateString) => {
    const newDate = dateString.replace(/-/g, '');
    const dateArray = Array.from(newDate, Number);
    return dateArray;
  };

  const freeHours = 24 - sleepHours - otherBusyHours;
  const onlyYearStart = parseInt(parseDate(startDate).slice(0, 4).join(''), 10);
  const onlyMonthStart = parseInt(
    parseDate(startDate).slice(4, 6).join(''),
    10
  );
  const onlyDayStart = parseInt(parseDate(startDate).slice(6, 8).join(''), 10);
  const onlyYearEnd = parseInt(parseDate(endDate).slice(0, 4).join(''), 10);
  const onlyMonthEnd = parseInt(parseDate(endDate).slice(4, 6).join(''), 10);
  const onlyDayEnd = parseInt(parseDate(endDate).slice(6, 8).join(''), 10);
  console.log(
    onlyYearStart,
    onlyMonthStart,
    onlyDayStart,
    onlyYearEnd,
    onlyMonthEnd,
    onlyDayEnd
  );

  let remainingYearsCalculator = onlyYearEnd - onlyYearStart;
  let remainingMonthsCalculator = onlyMonthEnd - onlyMonthStart;
  const remainingDaysCalculator = onlyDayEnd - onlyDayStart;
  const remainingDayFinalizer =
    remainingMonthsCalculator * 30 +
    remainingYearsCalculator * 365 +
    remainingDaysCalculator;

  if (remainingMonthsCalculator > 0) {
    remainingMonthsCalculator -= 1;
  }

  if (remainingYearsCalculator > 0) {
    remainingYearsCalculator -= 1;
  }
  console.log(
    remainingYearsCalculator,
    remainingMonthsCalculator,
    remainingDaysCalculator,
    remainingDayFinalizer
  );

  const avgHoursPerDay = busyHours / remainingDayFinalizer;

  console.log(freeHours, avgHoursPerDay);

  return (
    <div>
      <Container className="small-container">
        <div className="mb-3">
          <Button className="bg-warning">
            <Link to={`/signup`}>
              Want some extra features in the future? Register here.
            </Link>
          </Button>
        </div>
        <br></br>
      </Container>
      <h1>Calendar page</h1>
      <Container className="small-container">
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
      </Container>
      <br></br>
      {showResults && (
        <div>
          <Container className="small-container">
            <Card className="bg-light border-primary">
              <Card.Body>
                <Card.Text>
                  Remaining years untill deadline:{' '}
                  <b>{remainingYearsCalculator}</b>
                </Card.Text>
                <Card.Text>
                  Remaining months untill deadline:{' '}
                  <b>{remainingMonthsCalculator}</b>
                </Card.Text>
                <Card.Text>
                  Remaining days untill deadline: <b>{remainingDayFinalizer}</b>
                </Card.Text>
                <Card.Text>
                  Available hours per day: <b>{freeHours}</b>
                </Card.Text>
                <Card.Text>
                  Average hours required per day to complete the project:{' '}
                  <b>{avgHoursPerDay}</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )}
    </div>
  );
}
