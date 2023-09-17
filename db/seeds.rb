# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name_en: 'Star Wars' }, { name_en: 'Lord of the Rings' }])
#   Character.create(name_en: 'Luke', movie: movies.first)
#
#   For More Information, 
#   @see https://guides.rubyonrails.org/v5.1/active_record_migrations.html#migrations-and-seed-data



def create_admin(name, mail, pass)
    admin = User.create(name: name, email: mail, password: pass, password_confirmation: pass, role: "admin" )
    if admin.save
        puts "El administrador: #{admin.email} ha sido creado."
    else
        puts "Error:#{admin.email} > #{admin.errors.full_messages}"
    end
end

create_admin('Admin', 'demo@admin.com', 'password')

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

Block.all.delete_all
Page.all.delete_all
Image.all.delete_all
Video.all.delete_all
Country.all.delete_all
lorem = Faker::Hacker.say_something_smart

create_page('static', 'es', 'DomGL on Rails', 'es', "<p>Dynamic websites on webgl with minimal effort</br>#{lorem}</p>")
create_page('static', 'es', 'Aviso de Privacidad', 'privacidad', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Contacto', 'contacto', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Términos y Condiciones', 'terminos', Faker::Hacker.say_something_smart)
create_page('static', 'es', 'Nosotros', 'nosotros', Faker::Hacker.say_something_smart)

create_page('static', 'en', 'DomGL on Rails', 'en', "<p>Dynamic websites on webgl with minimal effort</br>#{lorem}</p>")
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