class Block < ApplicationRecord
  belongs_to :page
	belongs_to :image, optional: true
  validates_presence_of :category, :content

end