class UsersController < ApplicationController

  def index
    @users = User.all
    respond_to do |format|
      format.html {}
      format.json {render json: @users, :include => { :loans => {
                                                      :include => { :book => {
                                                          :only => :title } } } }}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.as_json(include: :loans)
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end

  private
  def user_params
    params.require(:user).permit(:provider, :uid, :encrypted_password, :reset_password_token,
                                         :reset_password_sent_at, :remember_created_at, :sign_in_count,
                                         :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip,
                                         :last_sign_in_ip, :name, :nickname, :image, :email, :tokens,
                                         :address_registrable, :number_loans)
  end



end
