class OgUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file
  before :cache, :capture_size

  def store_dir
    "#{model.category.pluralize}/og"
  end

  def filename
    "#{model.id}.#{model.extension}"
  end

  def cache_dir
    "#{Rails.root}/tmp/uploads"
  end
  
  def extension_allowlist
    %w(jpg jpeg gif png mp4 mp3)
  end
  
  private

  def capture_size(file)
    if version_name.blank? # Only do this once, to the original version
      if file.path.nil? # file sometimes is in memory
        img = ::MiniMagick::Image::read(file.file)
        model.width = img[:width]
        model.height = img[:height]
      else
        model.width, model.height = `identify -format "%wx %h" #{file.path}`.split(/x/).map{|dim| dim.to_i }
      end
    end
  end

end