# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController

  around_action :set_lang
  before_action :set_page, except: [:edit, :update]
  
  # GET /resource/password/new
  # def new
  #   super
  # end
  
  # POST /resource/password
  # def create
  #   super
  # end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end
  
  protected

  def set_page
    @page = Page.where(category: "users", lang: @lang, slug: "reset_password").first
  end

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
