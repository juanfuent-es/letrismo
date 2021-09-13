class Brush < ApplicationRecord

    before_save :set_slug
	mount_uploader :thumb, BrushUploader

	validates_uniqueness_of :name
	validates_presence_of :name

	private

	def set_slug
		if self.slug.blank? && !self.name.blank?
			self.slug = ActiveSupport::Inflector.transliterate(self.name.downcase).gsub(/[^0-9A-Za-z]/, '-')
		end
	end

end