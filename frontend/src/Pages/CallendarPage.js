import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function CallendarPage() {
  const [busyHours, setBusyHours] = useState('');
  const [date, setDate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalHours, setTotalHours] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('calculate-hours', {
        busyHours,
        date,
        selectedStartDate,
        selectedEndDate,
        totalHours,
      });
    } catch (err) {
      toast.error(getError(err));
    }


  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Callendar page</title>
      </Helmet>
      <h1 className="my-3">CaLENDAR pAGE</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="busyHours">
          <Form.Label>Busy hours</Form.Label>
          <Form.Control
            type="number"
            required
            onChange={(e) => setBusyHours(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Calculate</Button>
        </div>
      </Form>
    </Container>
  );
}
