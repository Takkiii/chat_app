# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    "#{secure_token}.jpg" if original_filename
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
