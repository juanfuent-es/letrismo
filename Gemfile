source 'http://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
gem 'mysql2'

# server
gem 'puma', '~> 4.1'
# Boot large Ruby/Rails apps faster
gem 'bootsnap', require: false

# compress, optimization
gem 'htmlcompressor', '~> 0.3.0'

# assets
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 4.0'
gem 'rails_admin', '~> 2.0'
gem 'will_paginate'
# Procesamiento de imágenes
gem 'carrierwave'
gem 'carrierwave-base64'
gem 'carrierwave-imageoptimizer'
gem 'rmagick', '~> 2.15.4'
gem 'mini_magick' #, '~> 4.8'

if RUBY_PLATFORM =~ /x86_64-linux/
	gem 'webp-ffi'
	gem 'mini_racer', platforms: :ruby
end

# autentication
gem "devise"

# active admin
gem 'font-awesome-sass', '~> 5.13.0'

# consola en browser
gem 'web-console', '>= 3.3.0', group: :development
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]