source 'https://rubygems.org'
ruby '2.0.0'
gem 'rails', '3.2.13'
group :assets do
  gem 'sass-rails'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'cancan'
gem 'devise'
gem 'figaro'
gem 'haml-rails'
gem 'rolify'
gem 'simple_form'
gem 'thin'
gem 'jbuilder'
gem 'high_voltage'
group :production do
  gem 'pg'
end
group :development do
  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_19, :mri_20, :rbx]
  gem 'html2haml'
  gem 'quiet_assets'
  gem 'rails_layout'
  gem 'sqlite3'
end
group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'pry-rails'
end
group :test do
  gem 'capybara'
  gem 'cucumber-rails', :require=>false
  gem 'database_cleaner', '1.0.1'
  gem 'email_spec'
  gem 'launchy'
end
