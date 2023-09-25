# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  around_action :get_lang
  before_action :set_page, except: [:destroy]
  # GET /resource/sign_in
  # def new
  #   super
  # end
  
  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  def set_page
    @page = Page.where(category: "users", lang: @lang, slug: "sign_in").first
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
