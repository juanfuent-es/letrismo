class CreateBrushes < ActiveRecord::Migration[6.0]
  def change
    create_table :brushes do |t|
      t.string :name,       default: ""
      t.string :dificulty,  default: "Media"
      t.string :thumb,      default: ""
      t.string :slug,       default: ""
      t.string :family,     default: ""
      t.text :properties
      t.text :description

    end
  end
end
