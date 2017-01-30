class LoansController < ApplicationController
  def searchLoans
    if params[:keywords].present?
      @keywords = params[:keywords]
      @keywords.downcase!
      @loans = Loan.where("title LIKE ?", "%#{@keywords}%")
    else
      @loans = []
    end
    respond_to do |format|
      format.html {}
      format.json {render json: @loans}
    end
  end

  def index

    @loans = Loan.all

    respond_to do |format|
      format.html {}
      format.json {render json: @loans, include: [:admin, :user, :book]}
    end
  end

  def show
    @loan = Loan.find(params[:id])
    render json: @loan.as_json(include: [:admin, :user, :book])
  end

  def create
    @loan = Loan.new(loan_params)
    if @loan.save
      render json: @loan.as_json, status: :ok
    else
      render json: {loan: @loan.errors, status: :no_content}
    end
  end

  def update
    @loan = Loan.find(params[:id])
    if @loan.update_attributes(loan_params)
      render json: @loan.as_json, status: :ok
    else
      render json: {loan: @loan.errors, status: :unprocessable_entity}
    end

  end

  def destroy
    @loan = Loan.find(params[:id])
    @loan.destroy
    head :no_content
  end

  private
  def loan_params
    params.require(:loan).permit(:loaned, :admin_id, :user_id, :book_id)
  end
end
