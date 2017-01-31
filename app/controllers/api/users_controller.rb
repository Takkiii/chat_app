class Api::UsersController < ApplicationController
  def search
    query = params[:search_query].strip
    if query.present?
      @users = User.search(:name_cont => params[:search_query]).result
      render json: { status: 200, users: @users }
    else
      render json: { status: 400, errors: '検索したいユーザ名を入力してください' }
    end
  end
end
