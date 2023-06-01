import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default function CalendarPage() {
  const [busyHours, setBusyHours] = useState(0);
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

  

  return (
    <div>
      <h1>Calendar page</h1>
       
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="busyHours">
          <Form.Label>Busy hours</Form.Label>
          <Form.Control
            type="number"
            required
            value={busyHours}
            onChange={(e) => setBusyHours(e.target.value)}
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
          <Form.Label>End Date</Form.Label>
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
