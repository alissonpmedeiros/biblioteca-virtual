class AddressesController < ApplicationController
  def index
    @addresses = Address.all

    respond_to do |format|
      format.html {}
      format.json {render json: @addresses}
    end
  end

  def show
    @address = Address.find(params[:id])
    render json: @address.as_json
  end

  def create
    @address = Address.new(address_params)
    if @address.save
      render json: @address.as_json, status: :ok
    else
      render json: {address: :@address.errors, status: :no_content}
    end
  end

  def update
    @address = Address.find(params[:id])
    if @address.update_attributes(address_params)
      render json: @address.as_json, status: :ok
    else
      render json: {address: @address.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @address = Address.find(params[:id])
    @address.destroy
    head :no_content
  end

  private
  def address_params
    params.require(:address).permit(:state_id, :city, :street, :zipcode, :user_id)
  end
end
