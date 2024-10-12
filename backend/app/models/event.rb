class Event < ApplicationRecord
  belongs_to :workshop, optional: true
  belongs_to :user
end
