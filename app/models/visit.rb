class Visit < ApplicationRecord
	belongs_to :visitor, inverse_of: :visits
	belongs_to :page, inverse_of: :visits
end