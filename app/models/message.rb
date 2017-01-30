class Message < ActiveRecord::Base
  belongs_to :user
  mount_uploader :image, ImageUploader

  validates :from_user_id, presence: true
  validates :to_user_id, presence: true

  scope :both_message, -> (from_user_id, to_user_id) {
    where(
      '(from_user_id = ? and to_user_id = ?) or (from_user_id = ? and to_user_id = ?)',
       from_user_id,
       to_user_id, to_user_id,
       from_user_id
    )
    .order(:created_at)
    .as_json
  }
end
