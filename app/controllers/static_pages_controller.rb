class StaticPagesController < ApplicationController

  def home
  end

  def gallery
  	@letrisms = Letrism.where(gallery: true)
  end

  def contact
  end

  def image_default
    send_file '/public/img_not_found.jpg', type: 'image/jpg', disposition: 'inline'
  end

end