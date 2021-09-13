class BrushUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  storage :file

  def store_dir
    "imgs/brush/#{model.slug}"
  end

  version :thumb do
    process resize_to_limit: [320, 320]
    def full_filename (for_file = model.source.file)
      "#{model.slug}-thumb.png"
    end
  end

end
