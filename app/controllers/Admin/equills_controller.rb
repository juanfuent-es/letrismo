
class Admin::EquillsController < ApplicationController

  before_action :authenticate_admin!
  before_action :set_equill, only: %i[ show edit update destroy ]

  layout "admin"

  # GET /equills
  def index
    @equills = Equill.all
  end

  # GET /equills/1
  def show
  end

  # GET /equills/new
  def new
    @equill = Equill.new
  end

  # GET /equills/1/edit
  def edit
  end

  # POST /equills
  def create
    @equill = Equill.new(equill_params)

    if @equill.save
      redirect_to admin_equills_url, notice: "Equill ha sido creado."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /equills/1
  def update
    if @equill.update(equill_params)
      redirect_to admin_equills_url, notice: "Equill ha sido actualizado."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /equills/1
  def destroy
    @equill.destroy
    redirect_to admin_equills_url, notice: "Equill ha sido eliminado."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_equill
      @equill = Equill.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def equill_params
      params.require(:equill).permit()
    end
end
