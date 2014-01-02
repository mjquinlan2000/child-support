class Client < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :name, :user_id, :gender_id, :income, :overnights, :children, :spouse_income

  has_one :user
  has_one :gender
  has_many :client_records
end
