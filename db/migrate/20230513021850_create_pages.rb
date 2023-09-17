class CreatePages < ActiveRecord::Migration[7.0]

  def change

    create_table :pages do |t|
      t.string :lang,            null: false, default: "es"
      t.string :slug,            null: false, default: ""
      t.string :category,        null: false, default: "", comment: "Static | Blog | Article | Tutorial | Course | Workshop"

      t.string :title,           null: false, default: ""
      t.text :content
      
      # OG_metadata
      t.string :og_title,        null: false, default: ""
      t.string :og_image,        default: ""
      t.string :og_description,  null: false, default: ""
      t.string :keywords,        default: ""

      t.boolean :restricted,     default: false, comment: "For static pages. e.g. Home, About, Contact, ..."

      t.timestamps
    end

  end

end