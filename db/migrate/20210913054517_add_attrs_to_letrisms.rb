class AddAttrsToLetrisms < ActiveRecord::Migration[6.0]
  def change
    # add_reference :letrisms, :equill, foreign_key: true
    remove_column :letrisms, :equill_id
    add_column :letrisms, :equill_id, :integer
    add_index :letrisms, :equill_id
  end
end