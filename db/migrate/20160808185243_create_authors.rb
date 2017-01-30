class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.text :bio

      t.timestamps null: false
    end
  end
end
