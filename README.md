# Letrismo - WebApp in RoR

##  Instrucciones de instalación
```
	$ git clone git@bitbucket.org:_elflaco/juanfuent.es.git
	$ cd juanfuent.es
	$ bundle install
	$ npm install
	$ yarn install
	$ rake db:create
	$ rake db:migrate
	$ rake db:seed
	$ rails s
```

# Base de datos
La configuración de base de datos está en 
```
./config/database.yml
default: &default
  adapter: mysql2
  encoding: utf8mb4 #Permite emojis
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000
  username: root
  password: password

development:
  <<: *default
  database: db_test

# Configuren con los datos de servidor
production:
  <<: *default
  database: db_production
```
Para consultar las migraciones, con sus atributos y tipos están ubicadas en:
```
./config/migrate/*
```

# Sesiones / Usuarios
El proyecto ocupa [devise](https://github.com/heartcombo/devise) para la autenticación de usuarios.

# Vistas
Las vistas se encuentran en el siguiente directorio.
```
./app/views/**/*.html.erb
```
Encontrarán una carpeta con layouts, de ahí se extienden todas las vistas, el layout existente contiene algunas buenas prácticas, aunque faltan algunas más para cubrir todas las nuevas necesidades y requerimientos existentes en 2020.

# Modelos
# Controladores
# Assets

# Metatags

Utilice los siguientes métodos por cada vista de acción para asignación de metadata por ruta.
<% provide(:title, "Title") %>
<% provide(:image, "./image_path.ext") %>
<% provide(:description, "Lorem ipsum dolor sit amet...") %>

Hay un ejemplo dentro de la vista home en views/statics.