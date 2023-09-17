class Comment < ApplicationRecord
	# relations
	has_many :comments, :as => :commentable
	belongs_to :visitor, inverse_of: :comment
	belongs_to :commentable

	#validations
	validates :message, presence: true

	private

end