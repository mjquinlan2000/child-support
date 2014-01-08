ChildSupport::Application.routes.draw do
  # authenticated :user do
  #   root :to => 'home#index'
  # end
  # root :to => "home#index"
  # devise_for :users
  # resources :users

  root to: 'home#index'

  get "/pages/*id" => 'pages#show', as: :page, format: false

  namespace :api, default: {format: :json} do
    resources :genders
    # resources :record_types
    # resources :client_records
    resources :clients do
      resources :client_records
    end

    get '/support_schedule' => 'support_schedule#show'
  end
end
