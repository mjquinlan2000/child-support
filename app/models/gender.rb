class Gender < ActiveRecord::Base
  # attr_accessible :title, :body

  attr_accessible :name

  validates :name, presence: true

  def self.male
    Gender.where(name: 'Male').first
  end

  def self.female
    Gender.where(name: 'Female').first
  end
end
