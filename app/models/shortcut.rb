class Shortcut < ApplicationRecord
    belongs_to :equill
    validates_presence_of :name, :unicode
  end