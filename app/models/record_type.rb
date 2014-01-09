class RecordType < ActiveRecord::Base
  attr_accessible :name

  has_many :client_records
end