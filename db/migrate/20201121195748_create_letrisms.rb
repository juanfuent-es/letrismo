class CreateLetrisms < ActiveRecord::Migration[7.0]
  def change
    create_table :letrisms do |t|
      t.references :user, 	null: false, foreign_key: true
      t.references :equill,	null: false, foreign_key: true
      t.string :bg, 		default: "#151512"
      t.string :fill, 		default: ""
      t.string :stroke, 	default: ""
      t.string :chars, 		default: ""
      t.string :slug,    default: ""
      t.json :paths
      t.string :img, 		default: ""
      t.boolean :gallery, 	null: false, default: false

      t.timestamps
    end
  end
end
