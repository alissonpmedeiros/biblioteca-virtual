class RequestBooksController < ApplicationController
  def index
    @request_books = RequestBook.all
    respond_to do |format|
      format.html {}
      format.json {render json: @request_books}
    end
  end

  def show
    @request_book = RequestBook.find(params[:id])
    render json: @request_book.as_json(include: [:user, :book])
  end

  def create
    @request_book = RequestBook.new(request_params)
    if @request_book.save
      render json: @request_book.as_json, status: :ok
    else
      render json: {request_book: @request_book.errors, status: :no_content}
    end
  end

  def update
    @request_book = RequestBook.find(params[:id])
    if @request_book.update_attributes(request_params)
      render json: @request_book.as_json, status: :ok
    else
      render json: {request_book: @request_book.errors, status: :unprocessable_entity}
    end

  end

  def destroy
    @request_book = RequestBook.find(params[:id])
    @request_book.destroy
    head :no_content
  end

  private
  def request_params
    params.require(:request_book).permit(:user_id, :book_id, :request_status)
  end
end
