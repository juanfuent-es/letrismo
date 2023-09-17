class AdminController < ApplicationController

  before_action :authenticate_admin!

  layout "admin"

  def index
    @pages = Page.all
  end

end