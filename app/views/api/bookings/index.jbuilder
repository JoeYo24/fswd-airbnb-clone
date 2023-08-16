json.bookings @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.is_paid booking.is_paid
end
  