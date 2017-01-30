class AddNumberLoansToUsers < ActiveRecord::Migration
  def change
    add_column :users, :number_loans, :integer, default: 0
  end
end
