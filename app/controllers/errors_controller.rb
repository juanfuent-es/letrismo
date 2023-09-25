class ErrorsController < ApplicationController

  skip_after_action :verify_same_origin_request
  before_action :set_pages
  
  # https://guides.rubyonrails.org/v4.2.0/action_controller_overview.html
  layout "errors"
  
  def not_found
    @page = @pages.find_by_slug("404")
    render status: :not_found
  end
  
  def script_not_found
    send_file 'public/static/script-not-found.js', type: 'text/javascript', disposition: 'inline', status: :not_found
  end
  
  def unprocessable_entity
    @page = @pages.find_by_slug("422")
    render status: :unprocessable_entity
  end
  
  def server_error
    @page = @pages.find_by_slug("500")
    render status: :internal_server_error
  end

  def image_not_found
  	send_file 'public/static/img-not-found.png', type: 'image/png', disposition: 'inline'
  end

  private

  def set_pages
    lang = cookies[:lang] ? cookies[:lang] : 'en'
    @pages = Page.where(category: "errors", lang: lang)
  end

end