class PreviewUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick
  include CarrierWave::MiniMagick
  
  storage :file

  def store_dir
    "imgs/brush/preview/#{model.slug}"
  end

  def default_url
    "equills-previews/placeholder.png"
  end

  version :thumb do
    process resize_to_limit: [320, 320]
    def full_filename (for_file = model.source.file)
      "#{model.slug}-thumb.jpg"
    end
  end

end
