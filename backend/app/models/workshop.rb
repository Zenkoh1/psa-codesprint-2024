class Workshop < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :host,
    class_name: "User",
    foreign_key: :host_id
end
