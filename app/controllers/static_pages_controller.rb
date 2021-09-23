class StaticPagesController < ApplicationController

  def index 
    @letrisms = Letrism.all
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

  def image_default
    send_file '/public/img_not_found.jpg', type: 'image/jpg', disposition: 'inline'
  end

end