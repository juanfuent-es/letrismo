class CreateProperties < ActiveRecord::Migration[6.0]
  def change
    create_table :properties do |t|
      t.string :name,   default: "", null: false
      t.string :key,    default: "", null: false
      t.string :tipo,   default: "Float"
      t.float :min,     default: 0.0, null: false
      t.float :max,     default: 0.0, null: false
      t.float :step,    default: 0.0, null: false
      t.references :equill, null: false, foreign_key: true

      t.timestamps

    end
  end
end