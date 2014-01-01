class Client < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name

  has_one :user
  has_many :client_records
end
