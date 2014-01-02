class Client < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name, :user_id, :gender_id

  has_one :user
  has_one :gender
  has_many :client_records
end
