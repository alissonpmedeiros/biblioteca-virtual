class AddUserIdToAddress < ActiveRecord::Migration
  def change
    add_reference :addresses, :user_session
  end
end
