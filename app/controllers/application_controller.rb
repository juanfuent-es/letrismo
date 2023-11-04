class ApplicationController < ActionController::Base
	include VisitorHelper

	rescue_from ActiveRecord::RecordNotFound, :with => :render_not_found
	before_action :require_visit_registration
	after_action :set_vary_header
	around_action :set_lang

	def index
		render template: 'layouts/application'
	end

    # ¿Hay un administrador logueado?
    def authenticate_admin!
		if signed_in?
        	redirect_to root_path if !current_user.admin?
		else
			authenticate_user!
		end
    end

	def set_lang(&action)
		@lang = "es"
		# Evaluamos si existe el idioma en parámetro
		if params[:lang]
			# Si el idioma es válido se asigna como idioma de sitio
			if locale_valid?(params[:lang])
				@lang = params[:lang].to_s.downcase
			else
				#De lo contrario renderizamos error 404
				render_not_found
			end
		end
		cookies[:lang] = @lang
		I18n.with_locale(@lang, &action)
	end

	def render_not_found
		lang = cookies[:lang] ? cookies[:lang] : 'en'
    	@page = Page.where(category: "errors", lang: lang, slug: "404").first
		render template: 'errors/not_found', status: 404, layout: 'errors'
	end

    private

	def require_visit_registration
		unless visitor_logged?
			visitor_login(request.remote_ip)
		end
	end

	def locale_valid?(locale)
		I18n.available_locales.map(&:to_s).include?(locale)
	end

    def set_vary_header
		response.headers["Vary"] = "accept" if request.xhr?
	end

end