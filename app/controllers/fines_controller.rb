class FinesController < ApplicationController
  def index
    @fines = Fine.all

    respond_to do |format|
      format.html {}
      format.json {render json: @fines, :include => { :loan => {
          :include => [:admin, :user, :book]
           } }}
    end
  end

  def show
    @fine = Fine.find(params[:id])
    render json: @fine.as_json(include: :loan)
  end

  def create
    @fine = Fine.new(fine_params)
    if @fine.save
      render json: @fine.as_json, status: :ok
    else
      render json: {fine: :@fine.errors, status: :no_content}
    end
  end

  def update
    @fine = Fine.find(params[:id])
    if @fine.update_attributes(fine_params)
      render json: @fine.as_json, status: :ok
    else
      render json: {fine: @fine.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @fine = Fine.find(params[:id])
    @fine.destroy
    head :no_content
  end

  private
  def fine_params
    params.require(:fine).permit(:value, :loan_id)
  end
end
