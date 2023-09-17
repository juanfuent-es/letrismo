class CreatePages < ActiveRecord::Migration[7.0]

  def change

    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

    create_table :pages, id: :uuid do |t|
      t.string :lang,            null: false, default: "es"
      t.string :slug,            null: false, default: ""
      t.string :category,        null: false, default: "", comment: "Static | Blog | Article | Tutorial | Course | Workshop"

      t.references :image,      foreign_key: true, type: :uuid
      t.references :video,      foreign_key: true, type: :uuid

      t.string :title,           null: false, default: ""
      t.text :content
      
      # OG_metadata
      t.string :og_title,        null: false, default: ""
      t.string :og_image,        default: ""
      t.string :og_description,  null: false, default: ""
      t.string :keywords,        default: ""

      t.boolean :restricted,     default: false, comment: "For static pages. e.g. Home, About, Contact, ..."

      # t.references :og,          type: :uuid
      t.references :author,      foreign_key: { to_table: :users }, type: :uuid
      t.references :versionable, polymorphic: true, type: :uuid, comment: "For languages versions"
      
      t.timestamps
    end

    create_table :ogs, id: :uuid do |t|
      t.string :category,     null: false, default: ''
      t.string :mime_type,    null: false, default: ''
      t.string :extension,    null: false, default: ''
      t.string :image,          default: ''
      t.string :video,        default: ''
      t.string :audio,        default: ''
      t.integer :width,       default: 0
      t.integer :height,      default: 0

    end
    
    create_table :blocks, id: :uuid do |t|
      t.integer :number,      null: false, default: 0
      t.references :page,     null: false, foreign_key: true, type: :uuid
      t.references :image,    foreign_key: true, foreign_key: true, type: :uuid
      t.references :video,    foreign_key: true, foreign_key: true, type: :uuid
      t.string :category,     null: false, default: "text", :limit => 10, comment: "text | css | js | html | glsl"
      t.string :title,        null: false, default: ""
      t.text :content

      t.timestamps
    end

  end

end