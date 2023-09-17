require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Hive
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # catch server errors (404, 500, 422)
    config.exceptions_app = self.routes

    # CUSTOM GENERATOR
    # @see: https://guides.rubyonrails.org/generators.html
    config.generators do |g|
      g.scaffold_stylesheet false
      g.orm             :active_record
      g.template_engine :erb
      g.test_framework  :test_unit, fixture: false
      g.stylesheets     false
    end

    config.time_zone = 'Mexico City'
    
    I18n.available_locales = [:en, :es]
    I18n.default_locale = :es

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
