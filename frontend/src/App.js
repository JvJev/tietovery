import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Pages/PreviousPage';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './context/Store';
import SigninPage from './Pages/SigninPage';
import SignupPage from './Pages/SignupPage';
import CallendarPage from './Pages/CallendarPage';
import Badge from 'react-bootstrap/esm/Badge';
import PreviousPage from './Pages/PreviousPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>Time planner</NavBar.Brand>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavBar.Brand className="nav-link">Register</NavBar.Brand>
              </LinkContainer>

              <Nav className="me-auto">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    {/* <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer> */}
                    <LinkContainer to="/previous">
                      <NavDropdown.Item>Previous calculations</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/previous" element={<PreviousPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<CallendarPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            Task for Tietoevry academy. I am trying my best to make this code
            work in 3 days :)
            <br></br>
            Best regards, Jev
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
