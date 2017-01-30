class Category < ActiveRecord::Base
  before_save {
    self.category_name = category_name.downcase
  }
  
  has_many :books
end
