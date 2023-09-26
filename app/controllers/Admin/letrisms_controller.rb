
class Admin::LetrismsController < ApplicationController

  before_action :authenticate_admin!
  before_action :set_letrism, only: %i[ show edit update destroy ]

  layout "admin"

  # GET /letrisms
  def index
    @letrisms = Letrism.all
  end

  # GET /letrisms/1
  def show
  end

  # GET /letrisms/1/edit
  def edit
  end

  # PATCH/PUT /letrisms/1
  def update
    if @letrism.update(letrism_params)
      redirect_to admin_letrisms_url, notice: "Letrism ha sido actualizado."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /letrisms/1
  def destroy
    @letrism.destroy
    redirect_to admin_letrisms_url, notice: "Letrism ha sido eliminado."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_letrism
      @letrism = Letrism.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def letrism_params
      params.require(:letrism).permit()
    end
end
