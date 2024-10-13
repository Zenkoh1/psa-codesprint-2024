Rails.application.routes.draw do
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get '/member-data', to: 'members#show'

  
  namespace :api do
    namespace :v1 do
      get '/gemini/recommend_workshops', to: 'gemini#recommend_workshops'
      post '/gemini/chatbot', to: 'gemini#chatbot'

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
          get "registration_status", to: "workshops#registration_status"
          get "registrants", to: "workshops#registrants"
        end
      end

      resources :events do
        collection do
          get "get_user_events", to: "events#get_user_events"
        end
      end

      resources :wellbeings do
        collection do
          put "update_user_wellbeing", to: "wellbeings#update_user_wellbeing"
          get "get_user_wellbeing", to: "wellbeings#get_user_wellbeing"
        end
      end

      get '/dashboard/get_workshops_per_month', to: 'dashboard#get_workshops_per_month'
      get '/dashboard/get_user_emotions_count', to: 'dashboard#get_user_emotions_count'
      get '/dashboard/get_user_stress_count', to: 'dashboard#get_user_stress_count'
      get '/dashboard/get_monthly_average_workshop_registrations', to: 'dashboard#get_monthly_average_workshop_registrations'
      get '/dashboard/get_user_count', to: 'dashboard#get_user_count'
      get '/dashboard/get_forum_post_count', to: 'dashboard#get_forum_post_count'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
