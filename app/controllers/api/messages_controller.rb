class Api::MessagesController < ApplicationController

  def index
    messages = Message.both_message(
      params[:from_user_id],
      current_user.id
    )
    render json: {
      status: 200,
      messages: messages,
    }
  end

  def create
    @message = Message.new(message_params)
    @message.from_user_id = current_user.id
    if @message.save
      render json: { status: 200, message: @message }
    else
      render json: { status: 400, message: @message.errors }
    end
  end

  def upload_image
    @message = Message.new(image_params)
    @message.from_user_id = current_user.id
    if @message.save
      render json: { status: 200, message: @message }
    else
      render json: { status: 400, message: @message.errors }
    end
  end

  private

  def message_params
    params.require(:message).permit(:to_user_id, :text)
  end

  def image_params
    ActionController::Parameters.new(params).permit(:to_user_id, :image)
  end
end
