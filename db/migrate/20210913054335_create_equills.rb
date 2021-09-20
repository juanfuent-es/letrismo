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
      t.text :code
      t.text :libraries
      t.text :properties
      t.text :description

    end
  end
end
