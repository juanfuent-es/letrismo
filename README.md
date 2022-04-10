# Letrismo - WebApp in RoR

##  Instrucciones de instalación
```
	$ git clone https://github.com/juanfuent-es/letrismo.git
	$ cd letrismo
	$ bundle install
	$ npm install
	$ yarn install
	$ rake db:create
	$ rake db:migrate
	$ rails s
```
* (Asegurate de haber iniciado un server con mysql antes de correr `rails s`. El comando para hacerlo en mac es `mysql.server start`

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

# Stackoverflow soluciones a problemas comunes

* Si tienes problemas haciendo bundle install instalando la gema mysql2, prueba los siguientes links segun lo que aparezca en tu terminal (mac):

Para:
```
ld: library not found for -lzstd
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```
puedes consultar este [link](https://stackoverflow.com/questions/67840691/ld-library-not-found-for-lzstd-while-bundle-install-for-mysql2-gem-ruby-on-mac)

* Si tienes problemas en terminal/consola haciendo `yarn install` puede ser que tu version de `node` sea "demasiado" avanzada, en mi caso usaba `node 16.1.0` y tuve que bajar a `node 14.17.3` para que funcionara (macOS Big Sur 11.4 chip M1)

# Como crear un eQuill
## La clase base (brush.js)
Clona el archivo `brush.js` localizado en `app/javascript/brushes/` y utiliza sus metodos como base para desarrollar tu eQuill, brush.js es el ejemplo basico para realizar trazos y guardar coordenadas que seran dibujadas por medio de las funciones `beginShape()` y `endShape()` de p5.

Alternativamente, contamos con otra clase base inspirada en particulas llamada `brush-particle-0.js` con un `array` extra para guardar tus particulas y renderizarlas con nuevas propiedades en cada `frame` para animarlas.

Estos son solo ejemplos funcionales para demostrar el funcionamiento de los metodos basicos de p5 a los que tenemos acceso desde la clase y que estan conectados con algunos controles.
### Metodos y Controles recomendados

| Metodos                   | Descripcion                   |
| ------------------------- | ----------------------------- |
| p5.setup()                | Lorem                         |
| p5.events(key, value)     | Lorem                         |
| p5.updateAttr(key, value) | Lorem                         |
| p5.draw()                 | Lorem                         |
| p5.windowResized()        | Lorem                         |
| p5.mousePressed()         | Lorem                         |
| p5.mouseDragged()         | Lorem                         |
| p5.mouseReleased()        | Lorem                         |
| p5.reset()                | Lorem                         |
| p5.data()                 | Lorem                         |
| p5.screenshot()           | Lorem                         |

| Controles (keycode)       | Descripcion                   |
| ------------------------- | ----------------------------- |
| ESC (27)                  | Lorem                         |
| ENTER (13)                | Lorem                         |
| Flecha Izquierda (37)     | Lorem                         |
| Flecha Derecha (39)       | Lorem                         |
| "x" (88)                  | Lorem                         |
| Barra espaciadora (32)    | Lorem                         |


## Importa tu eQuill dentro de application.js
Una vez que hayas terminado tu eQuill, importalo dentro de application.js en las primeras lineas del archivo asi como los otros eQuills ya existentes como `LightBrush` o `Sgraffito`.

Dentro del constructor, la funcion `switch()` esta conectada a la `url`, por lo que para acceder a tu equill dentro de la plataforma tendras que usar el `string` definido en esta funcion; por ejemplo el eQuill LightBrush es cargado cuando se entra a la ruta `https://equills.letrismo.com/notebook/bulbo`.


## Conecta tu eQuill con el panel en Toolbar
Dentro de tu nuevo eQuill, busca el `slider` o el `input` en el DOM que hayas decidido utilizar para actualizar las variables de tu eQuill y usa un `eventListener` para conectarlo; puedes definir esta logica dentro del metodo `p5.events()` para seguir la convencion que hemos establecido hasta ahora.

Dentro del archivo `_toolbar.html.erb` podras ver los `sliders` definidos hasta ahora, asi como textos especificos y sliders extra definidos por eQuill. Si quisieras agregar mas `sliders` que modifiquen tu nuevo eQuill, crea un condicional que identifique el slug de tu eQuill y agrega la configuracion dentro, por ejemplo como lo hace el eQuill "Portal":

```ruby
<% if @equill.slug == "portal" %>
    <p class="Tool__settings-panel__property">Duración del vaivén</p>
    <div class="Tool__settings-panel__input-wrap">
        <input type="range" min="0" max="6" step="1" value="3" id="mortality-input" class="styled-slider">
    </div>
<% end %>
```

### Paneles de propiedades por defecto (Toolbar)
De momento se cuenta con 2 `input range` por defecto para manipular cada eQuill, sus `ids` son:
* flow-input
* layers-input

Pero puedes customizar tanto su `etiqueta` de texto como los valores `min`, `max` y `step` del input. referenciando directamente al input de la siguiente manera:
```js
  window["flow-input"].min = 1;
  window["flow-input"].max = 20;
  window["flow-input"].step = 0.5;
  window["flow-input"].style.cssText = `--value:${window["flow-input"].value}; --min:${window["flow-input"].min}; --max:${window["flow-input"].max};`;
```

Nota que el css en linea tambien tiene que actualizarse con los nuevos valores de min, max y value para que la `barra` del rango se coloree correctamente.


## Crea el eQuill en el /admin del sitio
Pide a un administrador que registre el eQuill en la plataforma utilizando el CMS dentro de `https://equills.letrismo.com/admin/equill`. El administrador unicamente tiene que asegurarse de que el nombre del equill coincida con el `string` definido en el switch cuando lo cree por primera vez. (O Juan debe permitir que se actualice el `slug` :p)
