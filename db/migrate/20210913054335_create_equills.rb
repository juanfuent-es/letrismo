class CreateEquills < ActiveRecord::Migration[7.0]
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
      t.boolean  :public,   default: false
    end

    create_table :shortcuts do |t|
      t.references :equill, null: false, foreign_key: true
      t.string :name,   default: ""
      t.string :unicode,  default: ""
      t.timestamps
    end

    create_table :properties do |t|
      t.references :equill, null: false, foreign_key: true
      t.string :name,   default: "", null: false
      t.string :key,    default: "", null: false
      t.string :tipo,   default: "Float"
      t.float :min,     default: 0.0, null: false
      t.float :max,     default: 0.0, null: false
      t.float :step,    default: 0.0, null: false
      t.timestamps
    end

  end
end
