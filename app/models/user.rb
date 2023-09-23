class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :omniauthable
  devise :database_authenticatable,
          :recoverable, 
          :rememberable, 
          :validatable, 
          :registerable, 
          :confirmable, 
          :lockable, 
          :timeoutable, 
          :trackable

  # validates_uniqueness_of :username
  mount_uploader :avatar, AvatarUploader

end