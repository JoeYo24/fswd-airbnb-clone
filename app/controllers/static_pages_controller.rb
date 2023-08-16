class StaticPagesController < ApplicationController
  def home
    render 'home'
  end
  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end
  def login 
    render 'login'
  end
  def my_properties
    @data = { user_id: current_session.user.id }.to_json
    render 'my_properties'
  end
  def my_bookings
    @data = { user_id: current_session.user.id }.to_json
    render 'my_bookings'
  end
  def edit_property
    @data = { property_id: params[:id] }.to_json
    render 'edit_property'
  end
  def new_property
    render 'new_property'
  end
  def booking_success
    @data = { booking_id: params[:id] }.to_json
    render 'booking_success'
  end
end
