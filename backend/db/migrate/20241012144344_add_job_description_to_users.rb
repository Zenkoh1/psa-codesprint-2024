class AddJobDescriptionToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :job_description, :text
  end
end
