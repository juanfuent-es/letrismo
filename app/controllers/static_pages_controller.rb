class StaticPagesController < ApplicationController

  def page
    @pages = Page.where(lang: @lang)
    slug = params[:slug] ? params[:slug] : @lang
    @page = @pages.find_by_slug(slug)
    if !@page
      render template: 'errors/not_found', status: 404, layout: "errors"
    end
  end
  
  def home
  end

  def gallery
  	@letrisms = Letrism.where(gallery: true).paginate(page: params[:page])
  end

  def contact
  end

  def draw
  end

end