class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.integer :isbn
      t.integer :quantity
      t.string :category_references

      t.timestamps null: false
    end
  end
end
