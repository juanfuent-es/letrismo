class EquillsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]

	def index
		@equills = Equill.active
	end

    def show
		@equill = Equill.find_by_slug(params[:name])
	end

end
