class RecordType < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name, :is_monetary, :is_subtracted
end
