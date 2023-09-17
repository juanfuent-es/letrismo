class CreateVisitors < ActiveRecord::Migration[7.0]
  def change
    create_table :visitors do |t|
      t.string :location,	null: false, default: ""
      t.string :ip,			null: false, default: ""
      t.index :ip
    end

    create_table :visits do |t|
  		t.references :visitor, 		null: false, foreign_key: true
  		t.references :page, 		  null: false, foreign_key: true, type: :uuid
  		t.integer :counter, 		  null: false, default: 0
    end
    add_index :visits, [:page_id, :visitor_id],  unique: true

    create_table :likes do |t|
      t.references :visitor, 	null: false, foreign_key: true
      t.references :page, 		null: false, foreign_key: true, type: :uuid
      t.integer :count, 		  default: 0
    end
    add_index :likes, [:visitor_id, :page_id], unique: true

    create_table :comments do |t|
      t.references :visitor, 		    null: false, foreign_key: true
      t.string :commentable_type,	  null: false, default: ""
      t.integer :commentable_id
      t.text :message
      t.string :status, 			      null: false, default: 'revision', comment: "revision|approved|rejected"

      t.timestamps
    end

  end
end