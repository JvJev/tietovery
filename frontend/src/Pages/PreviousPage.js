import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, calculations: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function PreviousPage() {
  const [{ calculations }, dispatch] = useReducer(reducer, {
    calculations: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/calculations');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Jev's eshop</title>
      </Helmet>
      <div className="calculations">
        <Row>
          <div className="previousCalculation">
            {calculations.map((calc) => (
              <div key={calc._id}>
                <div>
                  <br></br>
                  <Container className="small-container">
                    <Card className="bg-light border-primary">
                      <Card.Body>
                        <Card.Text>
                          Start date:{' '}
                          <b>{calc.startDate}</b>
                        </Card.Text>
                        <Card.Text>
                          End date:{' '}
                          <b>{calc.endDate}</b>
                        </Card.Text>
                        <Card.Text>
                          Remaining days untill deadline:{' '}
                          <b>{calc.remainingDayFinalizer}</b>
                        </Card.Text>
                        <Card.Text>
                          Available hours per day: <b>{calc.freeHours}</b>
                        </Card.Text>
                        <Card.Text>
                          Average hours required per day to complete the
                          project: <b>{calc.avgHoursPerDay}</b>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Container>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </div>
    </div>
  );
}

export default PreviousPage;
