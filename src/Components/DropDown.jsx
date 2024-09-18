import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function MyDropdown() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.setItem("user",null);
        localStorage.setItem("authenticated",false);
        navigate("/")

    }
    function handleBookingHistory(){
        navigate(`/booking_history`)
    }
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {user?.fullName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Settings</Dropdown.Item>
        <Dropdown.Item href="#" onClick={handleBookingHistory}>Booking</Dropdown.Item>
        <Dropdown.Item onClick={handleLogOut}><button className='btn btn-danger'>Log out</button></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropdown;
