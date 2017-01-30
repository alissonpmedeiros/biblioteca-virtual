class AddAdminIdAndUserIdToLoans < ActiveRecord::Migration
  def change
    add_column :loans, :admin_id, :integer
    add_column :loans, :user_id,  :integer
  end
end
