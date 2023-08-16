class ApplicationController < ActionController::Base
    def current_session 
        return @current_session if @current_session

        token = cookies.signed[:airbnb_session_token]
        @current_session = Session.find_by(token: token)
    end
end
