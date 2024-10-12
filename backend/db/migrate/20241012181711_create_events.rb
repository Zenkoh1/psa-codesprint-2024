class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.references :user, null: false, foreign_key: true
      t.references :workshop, null: true, foreign_key: true
      t.index [:user_id, :workshop_id]

      t.timestamps
    end
  end
end
