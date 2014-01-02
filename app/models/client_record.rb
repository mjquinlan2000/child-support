class ClientRecord < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :record_type_id, :amount, :client_id

  has_one :record_type
  has_one :client
end
