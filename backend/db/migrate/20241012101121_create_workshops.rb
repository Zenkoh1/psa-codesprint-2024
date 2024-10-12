class CreateWorkshops < ActiveRecord::Migration[7.1]
  def change
    create_table :workshops do |t|
      t.string :title
      t.references :host, index: true, null: false, foreign_key: {to_table: :users, on_delete: :cascade}
      t.string :venue
      t.text :description
      t.datetime :start_time
      t.datetime :end_time

      t.timestamps
    end
  end
end
