class AddAttrsToLetrisms < ActiveRecord::Migration[6.0]
  def change
    add_reference :letrisms, :brush, null: false, foreign_key: true
  end
end