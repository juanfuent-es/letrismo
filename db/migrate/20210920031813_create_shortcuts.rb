class CreateShortcuts < ActiveRecord::Migration[6.0]
  def change
    create_table :shortcuts do |t|
      t.references :equill, null: false, foreign_key: true
      t.string :name,   default: ""
      t.string :unicode,  default: ""

      t.timestamps
    end
  end
end
