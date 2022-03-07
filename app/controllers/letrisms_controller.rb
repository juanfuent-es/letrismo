class LetrismsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]

	def new
		if params[:id]
			@equill = Equill.find_by_slug(params[:id])
			@letrism = Letrism.new(equill_id: @equill.id)
		else
			redirect_to "/"
		end
	end

	def index
		# @letrisms = Letrism.all
		@letrisms = Letrism.all.shuffle.take(6)
		@equill = Equill.active.shuffle.first
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
		params.require(:letrism).permit(:chars, :paths, :img, :bg, :stroke, :fill, :equill_id)
	end

end
