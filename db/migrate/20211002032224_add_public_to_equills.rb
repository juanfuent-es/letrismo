class AddPublicToEquills < ActiveRecord::Migration[6.0]
  def change
    add_column :equills, :public, :boolean, default: false
  end
end
