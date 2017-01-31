class Api::FriendshipsController < ApplicationController
  def index
    if current_user.friends.present?
      render json: { status: 200, user: current_user.as_json(methods: 'friends') }
    else
      render json: { status: 400, user: nil }
    end
  end

  def create
    @friendship = current_user.friendships_of_from_user.build(friendship_params)
    if @friendship.save
      render json: { status: 200, friendship: @friendship }
    else
      render json: { status: 400, friendship: @friendship.errors }
    end
  end

  def destroy
    destroy_user = current_user.friend_by_id(destroy_user_params[:to_user_id])
    if destroy_user.destroy
      render json: { status: 200, user: current_user.as_json(methods: 'friends') }
    else
      render json: { status: 400, user: current_user.as_json(methods: 'friends') }
    end
  end

  private

  def friendship_params
    params.require(:friendship).permit(:to_user_id)
  end

  def destroy_user_params
    ActionController::Parameters.new(params).permit(:to_user_id)
  end
end
