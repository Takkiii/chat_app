class Api::MessagesController < ApplicationController

  def index
    render json: (
      Message.both_message(
        params[:from_user_id],
        current_user.id
      )
    )
  end

  def create
    @message = Message.new(message_params)
    @message.from_user_id = current_user.id
    if @message.save
      render json: @message
    else
      render json: @message.errors
    end
  end

  def upload_image
    @message = Message.new
    @message.from_user_id = current_user.id
    @message.to_user_id = params[:to_user_id]
    @message.image = params[:image]
    if @message.save
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
