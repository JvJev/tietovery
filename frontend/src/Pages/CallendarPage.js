import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default function CalendarPage() {
  const [busyHours, setBusyHours] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/api/calculations/callendar', {
        selectedStartDate,
        selectedEndDate,
        busyHours,
      });

      console.log('Data posted to the server:', response.data);
      // Additional actions after successful submission

    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <h1>Calendar page</h1>
        <form>
            
        </form>




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
            value={selectedStartDate}
            onChange={(e) => setSelectedStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selectedEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={selectedEndDate}
            onChange={(e) => setSelectedEndDate(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Calculate</Button>
      </Form>
    </div>
  );
}
