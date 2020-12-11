class User < ApplicationRecord
	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
	devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

	validates_presence_of :username

	has_many :letrisms
	accepts_nested_attributes_for :letrisms, allow_destroy: true

end