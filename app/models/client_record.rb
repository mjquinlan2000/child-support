class ClientRecord < ActiveRecord::Base
  # attr_accessible :title, :body
  has_one :record_type
  has_one :client
end
