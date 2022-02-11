class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create,:destroy]
  
  
  def create

    user=User.find_by(email:params[:email])
    if user&.authenticate(params[:password])
      session[:user_id]=user.id  
      existing_cart=Cart.find_by(user_id:user.id)
      # byebug
      if(existing_cart!=nil && existing_cart.user_id==user.id)
        session[:cart_id]=existing_cart.id
      else
        cart=Cart.create!(total_items:0,total_amount:0,user_id:user.id)
        session[:cart_id]=cart.id
      end
      # shove_cards_from_guest_to_user_account
      render json: user, status: :created
    else
      render json: {errors: ["Invalid email or password"]}, status: :unauthorized
    end

  end

  def destroy
    session.delete :user_id
    session.delete :cart_id
    head :no_content
  end
end
