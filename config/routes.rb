Rails.application.routes.draw do

  # Api Routing
  namespace :api, { format: 'json' } do
    resources :users do
      collection do
        get 'search'
      end
    end
    resources :friendships, only: [:index, :create, :destroy]
  end

  # Web App Routing
  root 'messages#index'
  devise_for :users
  resources :users, only: :show do
    collection do
      get 'search'
    end
  end
end
