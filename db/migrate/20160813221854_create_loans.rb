class CreateLoans < ActiveRecord::Migration
  def change
    create_table :loans do |t|
      t.boolean :loaned, default: true
      t.references :book, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
