class ClientRecord < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :record_type_id, :amount, :client_id, :is_subtracted

  has_one :client
end
