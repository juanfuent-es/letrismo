class LetrismsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]

	def new
		if params[:equill]
			@eQuill = request.original_url.downcase.split("equill=")[1]
		else
			@eQuill = "0"
		end
		@letrism = Letrism.new
	end

	def index
		@letrisms = Letrism.all
	end

	def show
		@letrism = Letrism.find_by_slug(params[:id])
	end

	def create
	    @letrism = Letrism.new(letrism_params)
    	@letrism.user_id = current_user.id
    	if @letrism.save
    		redirect_to letrism_path(id: @letrism.slug)
    	else
    		render :new
    	end
	end

	private

	def letrism_params
		params.require(:letrism).permit(:chars, :paths, :img, :bg, :stroke, :fill)
	end

end
