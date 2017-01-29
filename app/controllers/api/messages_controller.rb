class Api::MessagesController < ApplicationController

  def index
    render json: Message.where('(from_user_id = ? and to_user_id = ?) or (from_user_id = ? and to_user_id = ?)', params[:from_user_id], current_user.id, current_user.id, params[:from_user_id]).order(:created_at).as_json
  end

  def create
    @message = Message.new(message_params)
    @message.from_user_id = current_user.id
    if @message.valid?
      @message.save
      render json: @message
    else
      render json: @message.errors
    end
  end

  private

  def message_params
    params.require(:message).permit(:to_user_id, :text)
  end
end
