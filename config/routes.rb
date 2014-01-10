ChildSupport::Application.routes.draw do
  root to: 'home#index'

  devise_for :users, controllers: {sessions: 'sessions'}

  devise_scope :user do
    get "users/current_user", to: "sessions#show_current_user"
  end

  get "/pages/*id" => 'pages#show', as: :page, format: false

  namespace :api, default: {format: :json} do
    resources :genders, only: [:index]
    resources :record_types, only: [:index]
    resources :clients do
      resources :client_records
    end

    get '/support_schedule' => 'support_schedule#show'
  end
end
