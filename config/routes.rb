Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/my_properties' => 'static_pages#my_properties'
  get '/my_bookings' => 'static_pages#my_bookings'
  get '/my_properties/:id/edit' => 'static_pages#edit_property'
  get '/my_properties/new' => 'static_pages#new_property'
  get '/booking/:id/success' => 'static_pages#booking_success'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update, :destroy]
    resources :bookings, only: [:index, :show, :create, :update, :destroy]
    resources :charges, only: [:create]

    get '/:user_id/properties' => 'properties#index'
    get '/:user_id/bookings' => 'bookings#index'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
    get '/bookings/:id' => 'bookings#show'

    # Stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end
end