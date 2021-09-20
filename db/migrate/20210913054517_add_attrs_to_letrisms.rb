class AddAttrsToLetrisms < ActiveRecord::Migration[6.0]
  def change
    add_reference :letrisms, :equill, null: false, foreign_key: true
  end
end