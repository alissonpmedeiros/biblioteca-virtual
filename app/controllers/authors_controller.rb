class AuthorsController < ApplicationController
  def searchAuthors
    if params[:keywords].present?
      @keywords = params[:keywords]
      @keywords.downcase!
      @authors = Author.where("first_name LIKE ?", "%#{@keywords}%")
    else
      @authors = []
    end

    respond_to do |format|
      format.html {}
      format.json {render json: @authors}
    end
  end

  def index
    @authors = Author.all

    respond_to do |format|
      format.html {}
      format.json {render json: @authors}
    end
  end

  def show
    @author = Author.find(params[:id])
    render json: @author.as_json(include: :books)
  end

  def create
    @author = Author.new(params.require(:author).permit(:first_name, :last_name, :bio))
    if @author.save
      render json: @author.as_json, status: :ok
    else
      render json: {author: @author.errors, status: :no_content}
    end
  end

  def update
    @author = Author.find(params[:id])
    unless(:books_attributes.blank?)
      authorBooks = author_params[:books_attributes]
      @author.books.destroy_all
      params[:author].delete :books_attributes
      unless(authorBooks.nil?)
        authorBooks.each do |book|
          book_save = Book.where(title: book[:title])
          unless(@author.books.exists?(book))
            @author.books << book_save
          end
        end
      end
    end

    if @author.update_attributes(author_params)
      render json: @author.as_json, status: :ok
    else
      render json: {author: @author.errors, status: :unprocessable_entity}
    end
  end


  def destroy
    @author = Author.find(params[:id])
    @author.destroy
    head :no_content
  end

  private
  def author_params
    unless params["author"]["books"].blank?
      params["author"]["books_attributes"] = params["author"]["books"]
      params["author"].delete("books")
    end
    params.fetch(:author, {}).permit(:first_name, :last_name, :bio,
                                     :books_attributes => [:id, :title, :isbn])
  end

end
