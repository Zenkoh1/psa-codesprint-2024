Rails.application.routes.draw do
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get '/member-data', to: 'members#show'

  
  namespace :api do
    namespace :v1 do
      resources :answers do
        member do
          put "like", to: "answers#upvote"
          get "like_info", to: "answers#upvote_info"
        end
      end
      resources :categories
      resources :questions

      resources :workshops do
        member do
          put "register", to: "workshops#register"
          put "unregister", to: "workshops#unregister"
        end
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
