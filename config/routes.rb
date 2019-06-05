Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  resources :users, only: [:create, :index, :show, :update, :destroy]
  resources :users do 
    resources :records
  end
end
