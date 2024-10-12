class CreateJoinTableUsersWorkshops < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :workshops do |t|
      t.index [:user_id, :workshop_id]
      t.index [:workshop_id, :user_id]
      t.timestamps
    end
  end
end
