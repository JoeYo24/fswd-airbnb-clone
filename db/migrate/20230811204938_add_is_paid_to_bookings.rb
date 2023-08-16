class AddIsPaidToBookings < ActiveRecord::Migration[6.1]
  def change
    add_column :bookings, :is_paid, :boolean, default: false
  end
end
