class Book < ActiveRecord::Base
  before_save {
  	self.title = title.downcase
  }	

  belongs_to :category
  has_many :loans
  has_and_belongs_to_many :users
  accepts_nested_attributes_for :users


end
