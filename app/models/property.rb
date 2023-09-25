class Property < ApplicationRecord
    belongs_to :equill
    validates_presence_of :name
    # validates_presence_of :key, :min, :max, :step, :equill, :name
  
  end