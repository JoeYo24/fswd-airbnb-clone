class ApplicationController < ActionController::Base
  def current_session
    token = cookies.signed[:airbnb_session_token]
    Session.find_by(token: token)
  end
end
