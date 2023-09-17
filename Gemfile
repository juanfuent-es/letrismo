source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/juanfuent-es/letrismo" }

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

# Bundle and transpile JavaScript [https://github.com/rails/jsbundling-rails]
gem "jsbundling-rails"

gem 'vuejs-rails'
gem "vite_rails", "~> 3.0"

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"
gem 'devise'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Read more: https://github.com/fnando/browser
gem 'browser'

# compress, optimization
gem 'htmlcompressor', '~> 0.3.0'
# assets
gem 'will_paginate'
# Procesamiento de imágenes
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'carrierwave-imageoptimizer'
gem 'rmagick' #, '~> 2.15.4'
gem 'mini_magick' #, '~> 4.8'
gem "wysiwyg-rails"

if RUBY_PLATFORM =~ /x86_64-linux/
	gem 'webp-ffi'
	gem 'mini_racer', platforms: :ruby
end

group :development, :test do
	gem "web-console"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "tailwindcss-rails", "~> 2.0"
