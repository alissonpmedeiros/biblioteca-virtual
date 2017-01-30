class CreateFines < ActiveRecord::Migration
  def change
    create_table :fines do |t|
      t.float :value
      t.integer :loan_id

      t.timestamps null: false
    end
  end
end
