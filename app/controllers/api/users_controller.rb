class Api::UsersController < ApplicationController
  def search
    query = params[:search_query].strip
    if query.present?
      @users = User.search(:name_cont => params[:search_query]).result
      render json: @users
    else
      render json: nil
    end
  end
end
