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
      t.string :param_1,    default: "Flow"
      t.string :param_2,    default: "Layers"
      t.text :js
      t.text :css
      t.text :html
      t.text :libraries
      t.text :description

    end
  end
end
