source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4", ">= 7.0.4.2"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem 'sprockets-rails'
# database: sqlite3 for dev. mysql2 for prod
gem "mysql2"
# gem "sqlite3"
gem 'escompress'

# Use the Puma web server [https://github.com/puma/puma]
gem "puma"
gem "faker"
# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"
# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"
gem "vite_rails", "~> 3.0"
gem 'devise'

# Reduces boot times through caching; required in config/boot.rb
# Read more: https://github.com/fnando/browser
gem 'browser'
gem "bootsnap" #, require: false

# Image & Video processors
# file uploader. Read more: https://github.com/carrierwaveuploader/carrierwave
# Read more: https://github.com/jtescher/carrierwave-imageoptimizer
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'carrierwave-imageoptimizer'
gem 'mini_magick'
gem 'rmagick'

# Catch errors
gem "sentry-ruby"
gem "sentry-rails"
gem "will_paginate"

# Optimize html
gem "htmlcompressor"

if RUBY_PLATFORM =~ /x86_64-linux/
  gem 'webp-ffi'
	gem 'mini_racer', platforms: :ruby
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]