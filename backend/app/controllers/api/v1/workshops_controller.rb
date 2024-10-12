class Api::V1::WorkshopsController < ApplicationController
  before_action :set_workshop, only: %i[ show update destroy ]
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
    
    if @workshop.save
      render json: @workshop, status: :created, location: api_v1_workshop_url(@workshop)
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workshops/1
  def update
    if @workshop.update(workshop_params)
      @workshop.events.each do |event|
        event.update(title: @workshop.title, start_time: @workshop.start_time, end_time: @workshop.end_time)
      end
      render json: @workshop
    else
      render json: @workshop.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workshops/1
  def destroy
    @workshop.destroy!
    @workshop.events.each do |event|
      event.destroy!
    end
  end

  def registrants
    @workshop = Workshop.find(params[:id])
    render json: @workshop.users
  end

  def registration_status
    @user = User.find(params[:user_id])
    @workshop = Workshop.find(params[:id])

    if @workshop.users.include? @user
      render json: {registered: true}
    else
      render json: {registered: false}
    end
  end

  def register
    @user = User.find(params[:user_id])

    @workshop = Workshop.find(params[:id])
    if @workshop.users.include? @user
      render json: {message: "User is already registered"}, status: :unprocessable_entity
      return
    end

    if @workshop.start_time < DateTime.now
      render json: {message: "Workshop has already started"}, status: :unprocessable_entity
      return
    end

    user_events = @user.events
    user_events.each do |event|
      if event.start_time < @workshop.end_time && event.end_time > @workshop.start_time
        render json: {message: "User has a conflicting event"}, status: :unprocessable_entity
        return
      end
    end

    @workshop.users << @user

    @event = Event.new(title: @workshop.title, start_time: @workshop.start_time, end_time: @workshop.end_time, user: @user, workshop: @workshop)
    @event.save
    render json: @workshop
  end

  def unregister
    @user = User.find(params[:user_id])

    @workshop = Workshop.find(params[:id])
    if !@workshop.users.include? @user
      render json: {message: "User is not registered"}, status: :unprocessable_entity
      return
    end

    @workshop.users.delete(@user)
    @event = Event.find_by(user: @user, workshop: @workshop)
    @event.destroy!
    render json: @workshop
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workshop
      @workshop = Workshop.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workshop_params
      params.require(:workshop).permit(:title, :venue, :description, :start_time, :end_time, :host_id)
    end
end
