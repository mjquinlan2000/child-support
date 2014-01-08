class ClientRecord < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :amount, :client_id, :is_subtracted, :name

  has_one :client
end
