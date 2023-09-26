Rails.application.routes.draw do

  devise_for :users, #path: "", :sign_out_via => [ :get ],
    :controllers => { 
      registrations: 'users/registrations',
      confirmations: 'users/confirmations',
      passwords: 'users/passwords',
      sessions: 'users/sessions',
      unlocks: 'users/unlocks'
    }

  devise_scope :user do
    get ':lang/sign_up', to: 'users/registrations#new'
    get ':lang/sign_in', to: 'users/sessions#new'
    get ':lang/confirmation', to: 'users/confirmations#new'
    get ':lang/reset_password', to: 'users/passwords#new'
    get ':lang/unlock', to: 'users/unlocks#new'
  end

  # admin
  get 'admin' => 'admin#index', as: :admin  
  
  namespace :admin do
    resources :users, :letrisms, :equills, :pages
  end
  
  # data
  get "manifest.json" => "site_info#manifest"
  get "sitemap" => "sitemaps#index"  # sitemaps
  
  scope format: true, constraints: { format: /jpg|png|gif|webp|JPG|JPEG|jpeg/ } do
		get '/*anything', to: "errors#image_not_found"
	end
  
  scope format: true, constraints: { format: /js/ } do
    get '/*anything', to: "errors#script_not_found"
  end
  
  # Errors
  # https://guides.rubyonrails.org/v4.2.0/action_controller_overview.html#custom-errors-page
  match "404", via: :all, to: "errors#not_found", as: :not_found
  match "422", via: :all, to: "errors#unprocessable_entity", as: :unprocessable_entity
  match "500", via: :all, to: "errors#server_error", as: :server_error
  match 'offline', via: :all, to: 'errors#offline', as: :offline
  
  # App  
  root "static_pages#show"
  get "mail" => "mailer#mail"
  get ':lang' => 'static_pages#show', as: :home
  get ':lang/:slug' => 'static_pages#show', as: :page # Dynamic by slug, instead of next routes

  resources :letrisms, :equills
  
end