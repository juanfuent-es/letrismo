class Page < ApplicationRecord
    # attrs obligatorios
    validates_presence_of :lang, :slug, :title
	validate :unique_slug_by_lang
    # validates_uniqueness_of :slug
    # validaciones de longitud
    validates :title, length: { maximum: 70 }
    validates :og_title, length: { maximum: 70 }
    validates :og_description, length: { maximum: 200 }

    #relations
	has_many :likes, inverse_of: :page
	has_many :visits, inverse_of: :page
	has_many :visitors, through: :visits
	has_many :comments, :as => :commentable, inverse_of: :page
	accepts_nested_attributes_for :visits, allow_destroy: true
	
	# tags
	has_many :taggings, inverse_of: :page
	has_many :tags, through: :taggings

	mount_uploader :og_image, PageUploader

    # views, likes

    def total_views
		views = 0
		self.visits.each { |l| views += l.counter }
		return views
	end

	def total_likes
		counter = 0
		self.likes.each { |l| counter += l.count }
		return counter
	end

	#tagging methods
	def self.tag_counts
		Tag.select("tags.*, count(taggings.tag_id) as count").joins(:taggings).group("taggings.tag_id")
	end

	def self.tagged_with(name)
		Tag.find_by_name!(name).pages
	end

	def tag_list
		tags.map(&:name).join(", ")
	end

	def tag_list=(names)
		self.tags = names.gsub(/\s+/, "").split(",").map do |n|
			Tag.where(name: n.strip).first_or_create!
		end
	end

	private 

	def unique_slug_by_lang
		exists = Page.where(lang: lang, slug: slug).first
		errors.add(:slug, "El slug debe ser único por idioma") if exists && exists != self
	end

end