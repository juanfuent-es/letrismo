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

Page.all.delete_all
lorem = Faker::Hacker.say_something_smart

create_page('static', 'es', 'eQuills', 'es', "<p>Dynamic websites on webgl with minimal effort</br>#{lorem}</p>")
create_page('static', 'es', 'Aviso de Privacidad', 'privacidad', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Contacto', 'contacto', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Términos y Condiciones', 'terminos', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Nosotros', 'nosotros', Faker::Hacker.say_something_smart)

create_page('static', 'en', 'eQuills', 'en', "<p>Dynamic websites on webgl with minimal effort</br>#{lorem}</p>")
create_page('static', 'en', 'Privacy Policy', 'privacy', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Terms and Conditions', 'terms', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'Contact', 'contact', Faker::Hacker.say_something_smart)
create_page('static', 'en', 'About', 'about', Faker::Hacker.say_something_smart)

create_page('error', 'en', 'Page Not Found', '404', 'The page you are trying to access does not exist, has been moved, or has been deleted.')
create_page('error', 'en', 'Unprocessable Entity', '422', 'The request could not be processed. Please try again later.')
create_page('error', 'en', 'Server Error', '500', 'An error has occurred on the server. Please try again later.')

create_page('error', 'es', 'Página no encontrada', '404', 'La página a la que intentas acceder no existe, se ha movido o se ha eliminado.')
create_page('error', 'es', 'Petición no resuelta', '422', 'La petición no pudo ser procesada. Por favor, reintenta de nuevo más tarde.')
create_page('error', 'es', 'Error de Servidor', '500', 'Ha ocurrido un error en servidor. Por favor, reintenta de nuevo más tarde.')