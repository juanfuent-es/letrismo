class Equill < ApplicationRecord

    before_save :set_slug
	mount_uploader :preview, PreviewUploader

	has_many :letrisms
	has_many :properties
	has_many :shortcuts
	accepts_nested_attributes_for :properties, allow_destroy: true
	accepts_nested_attributes_for :shortcuts, allow_destroy: true

	validates_uniqueness_of :name
	validates_presence_of :name

	private

	def set_slug
		if self.slug.blank? && !self.name.blank?
			self.slug = ActiveSupport::Inflector.transliterate(self.name.downcase).gsub(/[^0-9A-Za-z]/, '-')
		end
	end

end