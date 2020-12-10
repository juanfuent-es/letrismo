class AddColorsToLetrisms < ActiveRecord::Migration[6.0]
  def change
    add_column :letrisms, :bg, :string, 		default: "#151512"
    add_column :letrisms, :fill, :string, 		default: ""
    add_column :letrisms, :stroke, :string, 	default: ""
  end
end
