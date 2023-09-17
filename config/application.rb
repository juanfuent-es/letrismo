require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Www
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # catch server errors (404, 500, 422)
    config.exceptions_app = self.routes
    config.time_zone = 'Mexico City'
    
    I18n.available_locales = [:en, :es]
    I18n.default_locale = :es
    
  end
end