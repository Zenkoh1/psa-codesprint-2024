class CreateWellbeings < ActiveRecord::Migration[7.1]
  def change
    create_table :wellbeings do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :emotion
      t.integer :stress

      t.timestamps
    end
  end
end
