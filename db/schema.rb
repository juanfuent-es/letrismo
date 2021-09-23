# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_20_031813) do

  create_table "equills", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", default: ""
    t.string "dificulty", default: "Media"
    t.string "icon", default: ""
    t.string "thumb", default: ""
    t.string "preview", default: ""
    t.string "slug", default: ""
    t.string "family", default: ""
    t.text "js"
    t.text "css"
    t.text "html"
    t.text "libraries"
    t.text "description"
  end

  create_table "letrisms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "chars", default: ""
    t.string "slug", default: ""
    t.json "paths"
    t.string "img", default: ""
    t.boolean "gallery", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "bg", default: "#151512"
    t.string "fill", default: ""
    t.string "stroke", default: ""
    t.bigint "equill_id", null: false
    t.index ["equill_id"], name: "index_letrisms_on_equill_id"
    t.index ["user_id"], name: "index_letrisms_on_user_id"
  end

  create_table "properties", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "key", default: "", null: false
    t.string "tipo", default: "Float"
    t.float "min", default: 0.0, null: false
    t.float "max", default: 0.0, null: false
    t.float "step", default: 0.0, null: false
    t.bigint "equill_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["equill_id"], name: "index_properties_on_equill_id"
  end

  create_table "shortcuts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "equill_id", null: false
    t.string "name", default: ""
    t.string "unicode", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["equill_id"], name: "index_shortcuts_on_equill_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "avatar", default: ""
    t.string "contact", default: ""
    t.string "username", default: ""
    t.string "country", default: ""
    t.boolean "banned", default: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "letrisms", "equills"
  add_foreign_key "letrisms", "users"
  add_foreign_key "properties", "equills"
  add_foreign_key "shortcuts", "equills"
end
