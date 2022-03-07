class LetrismUploader < CarrierWave::Uploader::Base
  include CarrierWave::ImageOptimizer if RUBY_PLATFORM =~ /x86_64-linux/
  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "imgs/#{model.id}/"
  end

  version :full do
    def full_filename (for_file = model.source.file)
      "#{model.slug}-full.png"
    end
  end

  version :large do
    process resize_to_limit: [1000, 1000]
    process optimize: [{ quality: 80 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}-large.png"
    end
  end

  version :medium do
    process resize_to_limit: [600, 600]
    process optimize: [{ quality: 80 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}-medium.png"
    end
  end

  version :thumb do
    process resize_to_limit: [320, 320]
    process optimize: [{ quality: 80 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}-thumb.png"
    end
  end

end