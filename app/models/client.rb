class Client < ActiveRecord::Base
  attr_accessible :name,
                  :user_id,
                  :gender_id,
                  :income,
                  :overnights,
                  :children,
                  :spouse_income,
                  :maintenance_paid,
                  :maintenance_received

  has_one :user
  has_one :gender
  has_many :client_records, dependent: :delete_all
end
