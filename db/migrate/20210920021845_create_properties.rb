class CreateProperties < ActiveRecord::Migration[6.0]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :key
      t.float :min
      t.float :max
      t.float :step
      t.references :equill, null: false, foreign_key: true

      t.timestamps
    end
  end
end
