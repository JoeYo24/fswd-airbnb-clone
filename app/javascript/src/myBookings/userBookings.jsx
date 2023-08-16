import React from "react";
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

class UserBookings extends React.Component {
  state = {
    bookings: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    const { user_id } = this.props;
    fetch(`/api/${user_id}/bookings`, safeCredentials())
      .then(handleErrors)
      .then((res) => {
        this.setState({
          bookings: res.bookings,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        this.setState({ loading: false });
      });
  };

  initiateStripeCheckout = (booking_id) => {
    fetch(`/api/charges?booking_id=${booking_id}`, safeCredentials())
      .then(handleErrors)
      .then((response) => {
        if (response && response.charge && response.charge.checkout_session_id) {
          const stripe = new Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
          stripe.redirectToCheckout({
            sessionId: response.charge.checkout_session_id,
          });
        } else {
          console.error("No checkout session ID received.");
          alert("Payment initiation failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error initiating Stripe checkout:", error);
        alert("Payment initiation failed. Please try again.");
      });
  };

  handlePaymentClick = (booking_id) => {
    this.initiateStripeCheckout(booking_id);
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
                <div>
                  <p className="fw-bold">Booking ID: {booking.id}</p>
                  <p>Start Date: {booking.start_date}</p>
                  <p>End Date: {booking.end_date}</p>
                  <p className="fw-bold">Paid: {booking.is_paid ? "Yes" : "No"}</p>
                  {!booking.is_paid && (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => this.handlePaymentClick(booking.id)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default UserBookings;
