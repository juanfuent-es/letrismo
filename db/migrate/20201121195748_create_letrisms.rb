class CreateLetrisms < ActiveRecord::Migration[6.0]
  def change
    create_table :letrisms do |t|
      t.references :user, 	null: false, foreign_key: true
      t.string :chars, 		default: ""
      t.string :slug,    default: ""
      t.json :paths
      t.string :img, 		default: ""
    
      # t.string :bg,    default: "#151512"
      # t.string :fill,    default: "#151512"
      # t.string :stroke,    default: "#eae7e1"

      t.boolean :gallery, 	null: false, default: false

      t.timestamps
    end
  end
end
