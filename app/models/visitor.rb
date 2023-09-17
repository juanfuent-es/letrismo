class Visitor < ApplicationRecord
	has_many :comments
	has_many :likes
	
	has_many :visits
	accepts_nested_attributes_for :visits

	validates_uniqueness_of :ip

end