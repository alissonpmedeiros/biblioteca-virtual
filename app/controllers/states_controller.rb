class StatesController < ApplicationController
  def index
    @states = State.all

    respond_to do |format|
      format.html {}
      format.json {render json: @states}
    end
  end


  def create
    @state = State.new(state_params)
    if @state.save
      render json: @state.as_json, status: :ok
    else
      render json: {state: :@state.errors, status: :no_content}
    end
  end


  private
  def state_params
    params.require(:state).permit(:name, :code)
  end
end
