class StaticPagesController < ApplicationController

  before_action :set_pages

  def home
    @page = @pages.find_by_slug(@lang)
  end

  def show
    @page = @pages.find_by_slug(params[:slug])
  end

  def gallery
    @page = @pages.find_by_slug(@lang == "en" ? 'gallery' : 'galeria')
  	@letrisms = Letrism.where(gallery: true).paginate(page: params[:page])
  end

  def about
    @page = @pages.find_by_slug(@lang == "en" ? 'about' : 'acerca-de')
  end
  
  def contact
    @page = @pages.find_by_slug(@lang == "en" ? 'contact' : 'contacto')
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