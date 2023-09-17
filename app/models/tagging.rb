class Tagging < ApplicationRecord
	belongs_to :page #, inverse_of: :taggings
	belongs_to :tag, inverse_of: :taggings
end