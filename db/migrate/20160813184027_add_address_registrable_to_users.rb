class AddAddressRegistrableToUsers < ActiveRecord::Migration
  def change
    add_column :users, :address_registrable, :boolean, default: false
  end
end
