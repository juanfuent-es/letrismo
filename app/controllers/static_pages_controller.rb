class StaticPagesController < ApplicationController

  before_action :set_pages

  def home
    @page = @pages.find_by_slug(@lang)
  end

  def show
    @page = @pages.find_by_slug(params[:slug])
  end

  def gallery
  	@letrisms = Letrism.where(gallery: true) #.paginate(page: params[:page])
  end

  def manifest
    @page = @pages.find_by_slug(@lang == "en" ? 'manifest' : 'manifiesto')
  end
  
  def terms
    @page = @pages.find_by_slug(@lang == "en" ? 'terms-conditions' : 'terminos-y-condiciones')
  end
  
  def privacy
    @page = @pages.find_by_slug(@lang == "en" ? 'privacy-notice' : 'aviso-de-privacidad')
  end

  private 

  def set_pages
    @pages = Page.where(lang: @lang)
  end

end