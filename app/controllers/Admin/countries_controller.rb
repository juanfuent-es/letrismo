
class Admin::CountriesController < ApplicationController

  before_action :authenticate_admin!
  before_action :set_country, only: %i[ show edit update destroy ]

  layout "admin"

  # GET /countries
  def index
    @countries = Country.all
  end

  # GET /countries/1
  def show
  end

  # GET /countries/new
  def new
    @country = Country.new
  end

  # GET /countries/1/edit
  def edit
  end

  # POST /countries
  def create
    @country = Country.new(country_params)

    if @country.save
      redirect_to admin_countries_url, notice: "Country ha sido creado."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /countries/1
  def update
    if @country.update(country_params)
      redirect_to admin_countries_url, notice: "Country ha sido actualizado."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /countries/1
  def destroy
    @country.destroy
    redirect_to admin_countries_url, notice: "Country ha sido eliminado."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_country
      @country = Country.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def country_params
      params.require(:country).permit(:continent, :sub_continent, :name_es, :name_en, :code, :alpha_2, :alpha_3, :active)
    end
end
