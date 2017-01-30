class BooksController < ApplicationController
  def searchBooks
    if params[:keywords].present?
      @keywords = params[:keywords]
      @keywords.downcase!
      @books = Book.where("title LIKE ?", "%#{@keywords}%")
    else
      @books = []
    end
    respond_to do |format|
      format.html {}
      format.json {render json: @books}
    end
  end

  def index

    @books = Book.all

    respond_to do |format|
      format.html {}
      format.json {render json: @books}
    end
  end

  def show
    @book = Book.find(params[:id])
    render json: @book.as_json(include: :users && :category)
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book.as_json, status: :ok
    else
      render json: {book: @book.errors, status: :no_content}
    end
  end

  def update
    @book = Book.find(params[:id])
    if @book.update_attributes(book_params)
      render json: @book.as_json, status: :ok
    else
      render json: {book: @book.errors, status: :unprocessable_entity}
    end

  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    head :no_content
  end

  private
  def book_params
    params.require(:book).permit(:title, :isbn, :quantity, :category_id)
  end



end
