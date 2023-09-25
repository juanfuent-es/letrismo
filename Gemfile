source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# ruby "3.1.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4", ">= 7.0.4.2"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# database: sqlite3 for dev. mysql2 for prod
gem "mysql2"
gem "sqlite3"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"
gem "faker"
# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"
gem 'vuejs-rails'
gem "vite_rails", "~> 3.0"

gem 'devise'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Read more: https://github.com/fnando/browser
gem 'browser'

# Image & Video processors
# file uploader. Read more: https://github.com/carrierwaveuploader/carrierwave
# Read more: https://github.com/jtescher/carrierwave-imageoptimizer
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'carrierwave-imageoptimizer'
gem 'streamio-ffmpeg'
gem 'mini_magick'
gem 'rmagick'

# Catch errors
gem "sentry-ruby"
gem "sentry-rails"

# Optimize html
gem "htmlcompressor"

if RUBY_PLATFORM =~ /x86_64-linux/
  gem 'webp-ffi'
	gem 'mini_racer', platforms: :ruby
end

group :development, :test do
  gem "web-console"
end
