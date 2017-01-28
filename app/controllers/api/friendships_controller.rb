class Api::FriendshipsController < ApplicationController

  def index
    @user = User.find(current_user.id)
    render json: (@user.friends_of_from_user + @user.friends_of_to_user).to_json(:include => :messages)
  end

  def create
    @user = User.find(current_user.id)
    @friendship = @user.friendships_of_from_user.build(friendship_params)
    if @friendship.valid?
      render json: @friendship.save
    else
      render json: @friendship.errors
    end
  end

  def destroy
    @user = User.find(current_user.id)
    Friendship.find_by(
      to_user_id: friendship_params[:to_user_id],
      from_user_id: current_user.id
    ).destroy
    render json: @user.friends
  end

  private

  def friendship_params
    params.require(:friendship).permit(:to_user_id)
  end
end
