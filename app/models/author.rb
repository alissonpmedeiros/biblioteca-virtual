class Author < ActiveRecord::Base
  before_save {
    self.first_name = first_name.downcase
    self.last_name  = last_name.downcase
  }

  has_and_belongs_to_many :books
  #accepts_nested_attributes_for :books

end
