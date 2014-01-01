ChildSupport::Application.routes.draw do
  # authenticated :user do
  #   root :to => 'home#index'
  # end
  # root :to => "home#index"
  # devise_for :users
  # resources :users

  root to: 'home#index'

  namespace :api, default: {format: :json} do
    resources :genders
    resources :record_types
    resources :client_records
    resources :clients
  end
end