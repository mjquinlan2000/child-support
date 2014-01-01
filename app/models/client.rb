class Client < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name, :user_id

  has_one :user
  has_many :client_records
end
