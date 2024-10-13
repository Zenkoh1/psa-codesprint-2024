# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_10_13_063655) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "author_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_answers_on_author_id"
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories_questions", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "question_id", null: false
    t.index ["category_id"], name: "index_categories_questions_on_category_id"
    t.index ["question_id"], name: "index_categories_questions_on_question_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "user_id", null: false
    t.bigint "workshop_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "workshop_id"], name: "index_events_on_user_id_and_workshop_id"
    t.index ["user_id"], name: "index_events_on_user_id"
    t.index ["workshop_id"], name: "index_events_on_workshop_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_questions_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.boolean "admin", default: false
    t.text "job_description"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "users_workshops", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workshop_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "workshop_id"], name: "index_users_workshops_on_user_id_and_workshop_id"
    t.index ["workshop_id", "user_id"], name: "index_users_workshops_on_workshop_id_and_user_id"
  end

  create_table "votes", force: :cascade do |t|
    t.string "votable_type"
    t.bigint "votable_id"
    t.string "voter_type"
    t.bigint "voter_id"
    t.boolean "vote_flag"
    t.string "vote_scope"
    t.integer "vote_weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope"
    t.index ["votable_type", "votable_id"], name: "index_votes_on_votable"
    t.index ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope"
    t.index ["voter_type", "voter_id"], name: "index_votes_on_voter"
  end

  create_table "wellbeings", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "emotion"
    t.integer "stress"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_wellbeings_on_user_id"
  end

  create_table "workshops", force: :cascade do |t|
    t.string "title"
    t.bigint "host_id", null: false
    t.string "venue"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["host_id"], name: "index_workshops_on_host_id"
  end

  add_foreign_key "answers", "questions", on_delete: :cascade
  add_foreign_key "answers", "users", column: "author_id", on_delete: :cascade
  add_foreign_key "events", "users"
  add_foreign_key "events", "workshops"
  add_foreign_key "questions", "users", column: "author_id", on_delete: :cascade
  add_foreign_key "wellbeings", "users"
  add_foreign_key "workshops", "users", column: "host_id", on_delete: :cascade
end
