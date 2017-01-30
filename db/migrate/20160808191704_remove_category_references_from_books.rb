class RemoveCategoryReferencesFromBooks < ActiveRecord::Migration
  def change
    remove_column :books, :category_references, :string
  end
end
