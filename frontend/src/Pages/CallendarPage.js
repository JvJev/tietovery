import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function CallendarPage() {
  
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [availableHours, setAvailableHours] = useState(0);
  const [dailyWorkingHours, setDailyWorkingHours] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/api/callendar', {
        selectedStartDate,
        selectedEndDate,
        totalHours,
      });

      const { availableHours, dailyWorkingHours } = response.data;
      setAvailableHours(availableHours);
      setDailyWorkingHours(dailyWorkingHours);
      
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
        
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <DatePicker
            id="dateRange"
            selected={selectedStartDate}
            selectsStart
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            placeholderText="Start Date"
            type="date"
            required
            onChange={(date) => setSelectedStartDate(date)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <DatePicker
            selected={selectedEndDate}
            selectsEnd
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            minDate={selectedStartDate}
            placeholderText="End Date"
            type="date"
            required
            onChange={(date) => setSelectedEndDate(date)}
          />
        </Form.Group>
        <div>
          <label htmlFor="totalHours">Total Hours:</label>
          <input
            type="number"
            id="totalHours"
            value={totalHours}
            onChange={(e) => setTotalHours(Number(e.target.value))}
          />
        </div>


        <div className="mb-3">
          <Button type="submit">Calculate</Button>
        </div>
        
      </Form>
      {availableHours > 0 && (
        <div>
          <p>Available Hours: {availableHours}</p>
          <p>Daily Working Hours: {dailyWorkingHours}</p>
        </div>
      )}
      
    </Container>
  );
}
