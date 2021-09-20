class PreviewUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  storage :file

  def store_dir
    "imgs/brush/preview/#{model.slug}"
  end

  def default_url
    "equills-previews/placeholder.png"
  end

end
