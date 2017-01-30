class CreateRequestBooks < ActiveRecord::Migration
  def change
    create_table :request_books do |t|
      t.integer :user_id
      t.integer :book_id
      t.boolean :request_status, default: true

      t.timestamps null: false
    end
  end
end
