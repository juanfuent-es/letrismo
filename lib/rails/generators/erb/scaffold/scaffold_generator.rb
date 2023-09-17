# https://github.com/rails/rails/blob/main/railties/lib/rails/generators/erb/scaffold/scaffold_generator.rb
# frozen_string_literal: true

require "rails/generators/erb"
require "rails/generators/resource_helpers"

module Erb # :nodoc:
  module Generators # :nodoc:
    class ScaffoldGenerator < Base # :nodoc:
      include Rails::Generators::ResourceHelpers

      argument :attributes, type: :array, default: [], banner: "field:type field:type"

      def create_root_folder
        empty_directory File.join("app/views/admin", controller_file_path)
      end

      def copy_view_files
        available_views.each do |view|
          formats.each do |format|
            filename = filename_with_extensions(view, format)
            template filename, File.join("app/views/admin", controller_file_path, filename)
          end
        end
        # Views from final client. | Front end
        template "show.html.erb", File.join("app/views", controller_file_path, "#{singular_name}.html.erb")
        template "index.html.erb", File.join("app/views", controller_file_path, "#{plural_table_name}.html.erb")
      end

    private
      def available_views
        %w(index show new edit _form)
      end
    end
  end
end