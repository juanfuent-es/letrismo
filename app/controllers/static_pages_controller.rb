class StaticPagesController < ApplicationController

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