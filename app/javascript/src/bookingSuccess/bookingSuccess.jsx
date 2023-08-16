import React from 'react';

class BookingSuccess extends React.Component {
  state = {
    booking: {},
    loading: true,
  };

  componentDidMount() {
    this.fetchBooking();
  }

  getBookingIdFromUrl = () => {
    const urlParts = window.location.pathname.split('/');
    const bookingId = urlParts[urlParts.length - 2];
    return bookingId;
  };

  fetchBooking = () => {
    const bookingId = this.getBookingIdFromUrl();

    fetch(`/api/bookings/${bookingId}`)
      .then((res) => res.json())
      .then((data) => {
          this.setState({
            booking: data,
            loading: false,
          });
        })
      .catch((error) => {
        console.error('Error fetching booking:', error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { booking, loading } = this.state;

    return (
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>Booking Details</h1>
            <p>Booking ID: {booking.id}</p>
            <p>Start Date: {booking.start_date}</p>
            <p>End Date: {booking.end_date}</p>
            <p>Your payment is being processed!</p>
          </div>

        )}
      </div>
    );
  }
}

export default BookingSuccess;
