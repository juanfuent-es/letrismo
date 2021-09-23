RailsAdmin.config do |config|

  ### Popular gems integration

  # ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  # config.authorize_with do
  #   redirect_to main_app.root_path unless current_user.admin?
  # end


  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model User do
    edit do
      field :username
      field :email
      field :password
      field :password_confirmation
    end
  end

  config.model Letrism do
    edit do
      field :user
      field :img
      field :gallery
    end
  end


  config.model Letrism do
    edit do
      field :user
      field :img
      field :gallery
    end
  end

  config.model Property do 
    field :name do 
      label "Nombre para usuario"
    end
    # field :key do 
    #   label "key: nombre de variable en clase"
    # end
    # field :tipo, :enum do 
    #   label "Tipo"
    #   searchable false
    #   enum do
    #     ["Boolean", "Float", "Integer"]
    #   end
    # end
    # field :min do 
    #   label "Valor mínimo"
    # end
    # field :max do 
    #   label "Valor máximo"
    # end
    # field :step do
    #   label "Step: valor de incremento/decremento"
    # end
  end

  config.model Shortcut do
    edit do
      field :name do 
        label "Nombre"
      end
      field :unicode do
        label "Unicode"
      end
    end
  end

  config.model Equill do
    edit do
      field :name do
        label "Nombre"
      end
      field :preview do
        label "Vista Previa 1200x630"
      end
      field :thumb do
        label "Clase para icono"
      end
      field :properties do
        label "Propiedades"
      end
      field :shortcuts do
        label "Atajos"
      end
      field :dificulty, :enum do
        label "Dificultad"
        searchable false
        enum do
          ["Baja", "Media", "Alta"]
        end
      end
      field :html do
        label "HTML"
      end
      field :js do
        label "JS"
      end
      field :css do
        label "CSS"
      end
      field :libraries do
        label "Librerías"
      end
      field :description, :froala do
        label "Descripción"
      end
    end
  end

end