class AuthenticationController < ApplicationController

    # POST /auth/login
  
    def login
      @user = User.find_by(username: params[:username])
      if @user.authenticate(params[:password]) # authenticate method provided by Bcrypt and 'has_secure_password'
        token = JsonWebToken.encode(user_id: @user.id, username: @user.username)
        render json: { token: token, user_id: @user.id, user: @user }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
  
  end
  
  