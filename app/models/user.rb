class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :registerable
  devise :database_authenticatable, :recoverable, :rememberable, :validatable, :registerable

  validates_uniqueness_of :username
  mount_uploader :avatar, AvatarUploader

end