module Api
  class BookingsController < ApplicationController
    before_action :authorize_user, except: [:get_property_bookings]

    def create
      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'Cannot find property' }, status: :not_found unless property

      @booking = Booking.create({ user_id: current_session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date] })

      render 'api/bookings/create', status: :created
    rescue StandardError => e
      render json: { error: e.message }, status: :bad_request
    end

    def update
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'Cannot find booking' }, status: :not_found unless @booking

      if @booking.user_id != current_session.user.id
        return render json: { error: 'User not authorized to update booking' }, status: :unauthorized
      end

      if @booking.update(booking_params)
        render 'api/bookings/update', status: :ok
      else
        render json: { error: 'Booking could not be updated' }, status: :unprocessable_entity
      end
    end

    def destroy
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'Cannot find booking' }, status: :not_found unless @booking

      if @booking.user_id != current_session.user.id
        return render json: { error: 'User not authorized to delete booking' }, status: :unauthorized
      end

      @booking.destroy
      render json: { success: true }, status: :ok
    end

    def index
      @bookings = current_session.user.bookings.includes(:property).where('end_date > ?', Date.today)
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'Cannot find property' }, status: :not_found unless property

      @bookings = property.bookings.where('end_date > ?', Date.today)
      render 'api/bookings/index'
    end

    def show
      @booking = Booking.find_by(id: params[:id])
    end

    private

    def authorize_user
      return render json: { error: 'User not logged in' }, status: :unauthorized unless current_session
    end

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end

  