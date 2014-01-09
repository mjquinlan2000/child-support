class ClientRecord < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :amount, :client_id, :is_subtracted, :record_type_id

  has_one :client
  has_one :record_type
end
