Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  resources :users, only: [:create, :index, :show, :update, :destroy]
  resources :users do 
    resources :records
  end
  # get 'users/:user_id/records/date/:date', to: 'records#get_record_by_date'
  # put 'users/:user_id/records/date/:date', to: 'records#update_record_by_date'
end
