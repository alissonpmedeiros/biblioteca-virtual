class CategoriesController < ApplicationController
  def index
    @categories = Category.all

    respond_to do |format|
      format.html {}
      format.json {render json: @categories}
    end
  end

  def show
    @category = Category.find(params[:id])
    render json: @category.as_json(include: :books)
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: @category.as_json, status: :ok
    else
      render json: {category: :@category.errors, status: :no_content}
    end
  end

  def update
    @category = Category.find(params[:id])
    if @category.update_attributes(category_params)
      render json: @category.as_json, status: :ok
    else
      render json: {category: @category.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    head :no_content
  end

  private
  def category_params
    params.require(:category).permit(:category_name)
  end

end
