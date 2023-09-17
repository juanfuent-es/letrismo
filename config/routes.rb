Rails.application.routes.draw do
  
  # users
  devise_for :users, path: "", :sign_out_via => [ :get ],
  controllers: { sessions: 'users/sessions', registrations: 'users/registrations', passwords: 'users/passwords' }, 
  path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', registration: 'new', sign_up: 'register' }
  
  # admin
  get 'admin' => 'admin#index', as: :admin  
  namespace :admin do
    resources :users, :pages
  end
  
  # data
  get "manifest.json" => "site_info#manifest"
  get "humans" => "site_info#humans"
  get "tech" => "site_info#tech"
  
  get "docs" => "site_info#docs", as: :documentation
  # sitemaps
  get "sitemap" => "sitemaps#index"

  # Errors
  # https://guides.rubyonrails.org/v4.2.0/action_controller_overview.html#custom-errors-page
  match "404", via: :all, to: "errors#not_found", as: :not_found
  match "422", via: :all, to: "errors#unprocessable_entity", as: :unprocessable_entity
  match "500", via: :all, to: "errors#server_error", as: :server_error
  match 'offline', via: :all, to: 'errors#offline', as: :offline

  # App
  root "static#page"
  get ':lang' => 'static#page', as: :home
  get ':lang/:slug' => 'static#page', as: :page # Dynamic by slug, instead of next routes
  # get ':lang/contact' => 'static#page', as: :contact
  # get ':lang/contacto' => 'static#page', as: :contacto
  # get ':lang/privacy-notice' => 'legals#privacy', as: :privacy
  # get ':lang/aviso-de-privacidad' => 'legals#privacy', as: :privacidad
  # get ':lang/terms-conditions' => 'legals#terms', as: :terms
  # get ':lang/terminos-y-condiciones' => 'legals#terms', as: :terminos
      
  scope format: true, constraints: { format: /jpg|png|gif|webp|JPG|JPEG|jpeg/ } do
		get '/*anything', to: "errors#image_not_found"
	end
  
end