class Letrism < ApplicationRecord
	validates_presence_of :img, :paths
	
	before_save :set_slug
	belongs_to :user
	has_many :letrisms
	accepts_nested_attributes_for :letrisms

	mount_base64_uploader :img, LetrismUploader

	private

	def set_slug
		self.slug = SecureRandom.hex(10) if self.slug.blank?
	end
end