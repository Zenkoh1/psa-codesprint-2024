class Api::V1::WellbeingsController < ApplicationController
  before_action :set_wellbeing, only: %i[ show update destroy ]

  # GET /wellbeings
  def index
    @wellbeings = Wellbeing.all

    render json: @wellbeings
  end

  # GET /wellbeings/1
  def show
    render json: @wellbeing
  end

  # POST /wellbeings
  def create
    @wellbeing = Wellbeing.new(wellbeing_params)

    if @wellbeing.save
      render json: @wellbeing, status: :created, location: api_v1_wellbeing_url(@wellbeing)
    else
      render json: @wellbeing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /wellbeings/1
  def update
    if @wellbeing.update(wellbeing_params)
      render json: @wellbeing
    else
      render json: @wellbeing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /wellbeings/1
  def destroy
    @wellbeing.destroy!
  end

  def get_user_wellbeing
    @wellbeing = Wellbeing.find_by(user_id: params[:user_id])
    if @wellbeing.nil?
      render json: {error: "Wellbeing not found"}, status: :not_found
    else
      render json: @wellbeing
    end
  end

  def update_user_wellbeing
    @wellbeing = Wellbeing.find_by(user_id: params[:user_id])
    if @wellbeing.nil?
      @wellbeing = Wellbeing.new(wellbeing_params)
      if @wellbeing.save
        render json: @wellbeing
      else 
        render json: @wellbeing.errors, status: :unprocessable_entity
      end
    else
      if @wellbeing.update(emotion: params[:emotion], stress: params[:stress])
        render json: @wellbeing
      else
        render json: @wellbeing.errors, status: :unprocessable_entity
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wellbeing
      @wellbeing = Wellbeing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def wellbeing_params
      params.require(:wellbeing).permit(:user_id, :emotion, :stress)
    end
end
