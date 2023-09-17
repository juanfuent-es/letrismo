class Tag < ApplicationRecord
	has_many :taggings
	has_many :pages, through: :taggings

	validates :name, presence: true, uniqueness: true
end