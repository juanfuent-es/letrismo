class Like < ApplicationRecord
  #relations
  belongs_to :visitor, inverse_of: :likes
  belongs_to :page, inverse_of: :likes

end
