class Api::V1::WorkshopsController < ApplicationController
  before_action :set_workshop, only: %i[ show update destroy ]
  before_action :authenticate_user, only: %i[ update destroy]

  # GET /workshops
  def index
    @workshops = Workshop.all

    render json: @workshops
  end

  # GET /workshops/1
  def show
    render json: @workshop
  end

  # POST /workshops
  def create
    @workshop = Workshop.new(workshop_params)
    if current_user.present?
      @workshop.assign_attributes(host_id: current_user.id)
    else 
      render json: {error: "User is not signed in"}, status: :unprocessable_entity
      return 
    end
    
    if @workshop.save
      render json: @workshop, status: :created, location: api_v1_workshop_url(@workshop)
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workshops/1
  def update
    if @workshop.update(workshop_params)
      render json: @workshop
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workshops/1
  def destroy
    @workshop.destroy!
  end

  def register
    if current_user.present?
      @user = current_user
    else 
      render json: {error: "User is not signed in"}, status: :unprocessable_entity
      return 
    end

    @workshop = Workshop.find(params[:id])
    if @workshop.users.include? @user
      render json: {error: "User is already registered"}, status: :unprocessable_entity
      return
    end

    @workshop.users << @user
    render json: @workshop
  end

  def unregister
     if current_user.present?
      @user = current_user
    else 
      render json: {error: "User is not signed in"}, status: :unprocessable_entity
      return 
    end

    @workshop = Workshop.find(params[:id])
    if !@workshop.users.include? @user
      render json: {error: "User is not registered"}, status: :unprocessable_entity
      return
    end

    @workshop.users.delete(@user)
    render json: @workshop
  end

  private
    def authenticate_user
      if current_user.present?
        if @workshop.host_id != current_user.id || current_user.admin == false
          render json: {error: "User is not the host of the workshop"}, status: :unprocessable_entity
        else
          render json: {error: "User is not signed in"}, status: :unprocessable_entity
        end
      end
    end


    # Use callbacks to share common setup or constraints between actions.
    def set_workshop
      @workshop = Workshop.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workshop_params
      params.require(:workshop).permit(:title, :venue, :description, :start_time, :end_time)
    end
end
