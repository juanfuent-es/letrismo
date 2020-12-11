class LetrismUploader < CarrierWave::Uploader::Base
  include CarrierWave::ImageOptimizer if RUBY_PLATFORM =~ /x86_64-linux/
  include CarrierWave::MiniMagick
  include WebPConverter if RUBY_PLATFORM =~ /x86_64-linux/

  storage :file


  def store_dir
    "imgs/#{model.id}/"
  end

  version :full do
    def full_filename (for_file = model.source.file)
      "#{model.slug}.png"
    end
  end

  version :large do
    process convert: :jpg
    process resize_to_limit: [1000, 1000]
    process optimize: [{ quality: 80 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}.jpg"
    end
  end

  version :webp do
    process resize_to_limit: [1000, 1000]
    process convert_to_webp: [{ quality: 70, method: 5 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}.webp"
    end
  end

  version :thumb do
    process convert: :jpg
    process resize_to_limit: [320, 320]
    process optimize: [{ quality: 80 }] if RUBY_PLATFORM =~ /x86_64-linux/
    def full_filename (for_file = model.source.file)
      "#{model.slug}_thumb.jpg"
    end
  end

  def interlace(type)
    manipulate! do |img|
      img.interlace(type.to_s)
      img = yield(img) if block_given?
      img
    end
  end

  def quality(percentage)
    manipulate! do |img|
      img.quality(percentage.to_s)
      img = yield(img) if block_given?
      img
    end
  end

end