CarrierWave.configure do |config|
  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
  config.storage = :file
end
