class Address < ActiveRecord::Base
  belongs_to :state
  belongs_to :user

  #accepts_nested_attributes_for :states
  #accepts_nested_attributes_for :users
end
