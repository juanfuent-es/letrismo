Rails.application.routes.draw do

  	resources :letrisms
	devise_for :users
	devise_scope :user do
		get '/login' => 'devise/sessions#new'
		get '/log_out' => 'devise/sessions#destroy'
	end
  	
	root 'letrisms#index'

	get 'manifiesto' => 'static_pages#manifest'
	get 'gallery' => 'static_pages#gallery'
	get 'contacto' => 'static_pages#contact'
	get 'notebook' => 'letrisms#new'

	# data
	get "manifest.json" => "site_info#manifest"
	get "robots.txt" => "site_info#robots"
	get "sitemap.txt" => "site_info#sitemap"
	get "humans.txt" => "site_info#humans"
	get "tech.txt" => "site_info#tech"

	get "404" => "errors#not_found"
	get "422" => "errors#unacceptable"
	get "500" => "errors#server_error"

	scope format: true, constraints: { format: /jpg|png|gif/ } do
		get '/*anything', to: "static_pages#image_default"
	end

end