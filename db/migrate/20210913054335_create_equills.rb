class CreateEquills < ActiveRecord::Migration[6.0]
  def change
    create_table :equills do |t|
      t.string :name,       default: ""
      t.string :dificulty,  default: "Media"
      t.string :icon,       default: ""
      t.string :thumb,      default: ""
      t.string :preview,    default: ""
      t.string :slug,       default: ""
      t.string :family,     default: ""
      t.text :js
      t.text :css
      t.text :html
      t.text :libraries
      t.text :description

    end
  end
end
