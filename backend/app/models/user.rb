class User < ApplicationRecord
  has_many :questions, inverse_of: 'author'
  has_many :answers, inverse_of: 'author'
  has_and_belongs_to_many :workshops
  has_many :workshops, foreign_key: :host_id
  has_many :events, inverse_of: 'user'
  has_one :wellbeing, inverse_of: 'user'
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, 
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
         #:recoverable, :rememberable, :validatable,
end
