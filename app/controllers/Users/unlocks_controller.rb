# frozen_string_literal: true

class Users::UnlocksController < Devise::UnlocksController
  around_action :get_lang
  before_action :set_page #, except: [:show]
  
  # GET /resource/unlock/new
  # def new
  #   super
  # end

  # POST /resource/unlock
  # def create
  #   super
  # end

  # GET /resource/unlock?unlock_token=abcdef
  # def show
  #   super
  # end

  protected

  def set_page
    @page = Page.where(category: "users", lang: @lang, slug: "unlock").first
  end

  # The path used after sending unlock password instructions
  # def after_sending_unlock_instructions_path_for(resource)
  #   super(resource)
  # end

  # The path used after unlocking the resource
  # def after_unlock_path_for(resource)
  #   super(resource)
  # end
end
