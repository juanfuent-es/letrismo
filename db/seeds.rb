def create_admin(mail, pass)
    admin = User.new(email: mail, password: pass, password_confirmation: pass, admin: true )
    admin = User.new(email: "demo@admin.com", password: "password", password_confirmation: "password", admin: true )
    admin.skip_confirmation!
    if admin.save!
        puts "El administrador: #{admin.email} ha sido creado."
    else
        puts "Error:#{admin.email} > #{admin.errors.full_messages}"
    end
end

def create_page(category="static", lang="en", title="", slug="/", content="lorem ipsum...")
    page = Page.create({
        lang: lang,
        slug: slug,
        title: title,
        og_title: title,
        content: content,
        category: category,
        restricted: true
    })
    if page.save
        puts "La página #{title} ha sido creada"
    else
        puts "Error:#{lang}:#{title} > #{page.errors.full_messages}"
    end
end

# User.all.delete_all
# Page.all.delete_all

create_admin('demo@admin.com', 'password')

lorem = Faker::Hacker.say_something_smart

create_page('static', 'es', 'eQuills', 'es', "<p>eQuills es el término que adoptamos para referirnos a las herramientas de escritura digital que desarrollamos con el objetivo de dejar marcas imposibles de crear en el mundo físico. </br>Suena bien ¿Cierto? Pruébalo tú mismo.</p>")
create_page('static', 'es', 'Galería', 'galeria', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Contacto', 'contact', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Manifiesto', 'about', "<p>La forma de las letras siempre ha estado definida por las herramientas que se usan para escribirlas.</p><p>La última vez que vimos surgir nuevas formas en las letras y una estética reconocible fue en los 70 's con el surgimiento del graffiti contemporáneo que utilizó la pared como sustrato y la pintura en aerosol como herramienta.</p><p>Desde entonces, software avanzado como Photoshop y Procreate se han empeñado en darnos las posibilidades para replicar lo más fielmente posible todas las herramientas de escritura análogas imaginables. Y si bien agregan algunos atributos como las capas, edición de color, flujo inagotable de tinta y un historial de acciones susceptibles de ser deshechas, la mera imitación implica un alto a la experimentación y por consecuencia a la evolución. Las herramientas que tenemos a la mano hoy en día dejan las limitantes físicas para ubicarse más cercanas al mundo de las ideas.</p><p>Mediante el uso de lenguajes de programación Andrés Ochoa, Andrew Alva, Eli Ramos y Juan Fuentes, nos encontramos desarrollando herramientas de escritura digitales que buscan dejar marcas imposibles de crear en el mundo físico. Las hemos denominado 'eQuills' y en este sitio web podrás utilizarlas. Estamos ansiosos de que letristas alrededor del mundo las usen, escuchar sus opiniones y ver las nuevas e increíbles formas que resultarán de esta “nueva caligrafía”.</p>")
create_page('static', 'es', 'Aviso de Privacidad', 'aviso-de-privacidad', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Términos y Condiciones', 'terminos-y-condiciones', Faker::Hacker.say_something_smart)

create_page('static', 'en', 'eQuills', 'en', "<p>eQuills is the term we adopt to refer to the digital writing tools we develop with the goal of leaving marks impossible to create in the physical world. </br>Dream well, right? Try it yourself.</p>")
create_page('static', 'en', 'Gallery', 'gallery', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Contact', 'contacto', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Manifest', 'acerca-de', "<p>The shape of letters has always been defined by the tools used to write them.</p><p>The last time we saw new letterforms and a recognizable aesthetic emerge was in the 70's with the emergence of contemporary graffiti that used the wall as a substrate and spray paint as a tool.</p><p>Since then, advanced software such as Photoshop and Procreate have strived to give us the possibilities to replicate as closely as possible all the analog writing tools imaginable. And although they add some attributes such as layers, color editing, an inexhaustible flow of ink and a history of actions that can be undone, mere imitation implies a stop to experimentation and, consequently, to evolution. The tools we have at hand today leave physical limitations behind and are closer to the world of ideas.</p><p>Through the use of Andrés Ochoa, Andrew Alva, Eli Ramos and Juan Fuentes programming languages, we find ourselves developing digital writing tools that seek to leave marks that are impossible to create in the physical world. We have called them 'eQuills' and on this website you will be able to use them. We are eager for lyricists around the world to use them, hear their opinions, and see the incredible new shapes that will result from this “new calligraphy.”</p>")
create_page('static', 'en', 'Privacy Policy', 'privacy-notice', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Terms and Conditions', 'terms-conditions', Faker::Hacker.say_something_smart)

# errors
#en
create_page('errors', 'en', 'Page Not Found', '404', 'The page you are trying to access does not exist, has been moved, or has been deleted.')
create_page('errors', 'en', 'Unprocessable Entity', '422', 'The request could not be processed. Please try again later.')
create_page('errors', 'en', 'Server Error', '500', 'An error has occurred on the server. Please try again later.')
create_page('errors', 'en', 'Offline', 'offline', "You're disconnected. Check your internet Wi-Fi connection, mobile data or lan cable.")
#es
create_page('errors', 'es', 'Página no encontrada', '404', 'La página a la que intentas acceder no existe, se ha movido o se ha eliminado.')
create_page('errors', 'es', 'Petición no resuelta', '422', 'La petición no pudo ser procesada. Por favor, reintenta de nuevo más tarde.')
create_page('errors', 'es', 'Error de Servidor', '500', 'Ha ocurrido un error en servidor. Por favor, reintenta de nuevo más tarde.')
create_page('errors', 'es', 'Offline', 'offline', "Estás desconectado. Verifica tu conexión wifi, datos móviles o cable lan.")

# devise
# en
create_page('users', 'es', 'Crear Cuenta', 'sign_up', 'Completa los siguientes campos para crear tu cuenta.')
create_page('users', 'es', 'Iniciar Sesión', 'sign_in', 'Escribe tu mail y contraseña para acceder a la plataforma.')
create_page('users', 'es', 'Confirmación de Cuenta', 'confirmation', 'Para acceder a la plataforma necesitas primero confirmar tu cuenta, escribe tu email para recibir las instrucciones de confirmación.')
create_page('users', 'es', 'Recuperar Cuenta', 'reset_password', 'Ingresa tu e-mail para recibir un correo de recuperación.')
create_page('users', 'es', 'Desbloquear Cuenta', 'unlock', 'Ingresa tu e-mail para recibir instrucciones para desbloquear tu cuenta.')
# es
create_page('users', 'en', 'Create Account', 'sign_up', 'Complete the following fields for create your account.')
create_page('users', 'en', 'Sign In', 'sign_in', 'Write your email and password for access to the platform.')
create_page('users', 'en', 'Account Confirmation', 'confirmation', 'To access the platform you first need to confirm your account, enter your email to receive confirmation instructions.')
create_page('users', 'en', 'Reset Password', 'reset_password', 'Write your email to follow a recovery email.')
create_page('users', 'en', 'Unlock Account', 'unlock', 'Write your email for receive instructions for unblock your account.')