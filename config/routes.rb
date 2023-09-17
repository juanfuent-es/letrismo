Rails.application.routes.draw do

	devise_for :users, controllers: { registrations: 'user/registrations' }

  	resources :letrisms

	devise_scope :user do
		get '/login' => 'devise/sessions#new'
		get '/log_out' => 'devise/sessions#destroy'
	end
  	
	root 'static_pages#index'

	get 'manifiesto' => 'static_pages#manifest'
	get 'galeria' => 'static_pages#gallery'
	get 'contacto' => 'static_pages#contact'
	get 'notebook' => 'letrisms#new'
	get 'notebook/:id' => 'letrisms#new'
	get 'equills' => 'equills#index'

	# data
	get "manifest.json" => "site_info#manifest"
	get "robots.txt" => "site_info#robots"
	get "sitemap.txt" => "site_info#sitemap"
	get "humans.txt" => "site_info#humans"
	get "tech.txt" => "site_info#tech"

	  # Errors
	# https://guides.rubyonrails.org/v4.2.0/action_controller_overview.html#custom-errors-page
	match "404", via: :all, to: "errors#not_found"
	match "422", via: :all, to: "errors#unprocessable_entity"
	match "500", via: :all, to: "errors#server_error"
	match "offline", via: :all, to: "errors#offline", as: :offline

	scope format: true, constraints: { format: /jpg|png|gif|webp|JPG|JPEG|jpeg/ } do
		get '/*anything', to: "errors#image_not_found"
	end

	scope format: true, constraints: { format: /jpg|png|gif|webp|JPG|JPEG|jpeg/ } do
		get '/*anything', to: "errors#image_not_found"
	end

end