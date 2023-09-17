class SitemapsController < ApplicationController

	before_action :set_base_url

	def index
	end

	def static
        @pages = Page.where(restricted: true)
	end
	
	def images
	end

	private 

	def set_base_url
		@base_url = "#{request.protocol}#{request.host_with_port}"
	end

end