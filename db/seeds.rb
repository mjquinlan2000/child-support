# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) can be set in the file config/application.yml.
# See http://railsapps.github.io/rails-environment-variables.html
puts 'ROLES'
['admin'].each do |role|
  Role.find_or_create_by_name({ :name => role }, :without_protection => true)
  puts 'role: ' << role
end
puts 'DEFAULT USERS'
user = User.find_or_create_by_email :name => 'Default User'.dup, :email => 'default@example.com'.dup, :password => 'password'.dup, :password_confirmation => 'password'.dup
puts 'user: ' << user.name
user.add_role :admin

['Female', 'Male'].each do |name|
  Gender.find_or_create_by_name name: name
end

record_types = ['Healthcare', 'Healthcare (uninsured)', 'Education', 'Other Adjustment']

record_types.each do |type|
  RecordType.find_or_create_by_name name: type
end
