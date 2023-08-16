import React from "react";
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

class PropertyBookings extends React.Component {
  state = {
    bookings: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchPropertyBookings();
  }

  fetchPropertyBookings = () => {
    const { propertyId } = this.props;

    fetch(`/api/properties/${propertyId}/bookings`, safeCredentials())
      .then(handleErrors)
      .then((res) => {
        this.setState({
          bookings: res.bookings,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching property bookings:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { bookings, loading } = this.state;

    return (
      <div className="container py-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-group">
            {bookings.map((booking) => (
              <li key={booking.id} className="list-group-item">
                <div className="d-flex">
                  <p className="list-item">Start Date: {booking.start_date}</p>
                  <p className="list-item">End Date: {booking.end_date}</p>
                  <p className="list-item">Paid: {booking.is_paid ? "Yes" : "No"}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default PropertyBookings;
