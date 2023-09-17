module ApplicationHelper

	def device
		require "browser"
		if browser.device.mobile?
			return "mobile"
		elsif browser.device.tablet?
			return "tablet"
		else
			return "desktop"
		end
	end

	def isMobile
		return device == "mobile"
	end

	def full_title title
		base_title = 'eQuills'
		if title.empty?
			"#{base_title} | Letrismo"
		else
			"#{base_title} | #{title}"
		end
	end

	def og_title _title
		return only_text(_title)
	end

	def canonical
		request.original_url.gsub('http','https').gsub('www','')
	end

	def link(title, to)
		return link_to title, to, title: title
	end

	def meta_date _date
		if _date.empty?
			return Date.today.strftime("%Y-%m-%d")
		else
			return _date.to_date.strftime("%Y-%m-%d")
		end
	end

	def meta_image image
		_url = image.empty? ? "/eQuills-share-b.png" : image
		return "#{request.protocol}#{request.host_with_port}#{_url}"
	end

	def meta_description description
		return description.empty? ? "eQuills es el término que adoptamos para referirnos a las herramientas de escritura digital que desarrollamos con el objetivo de dejar marcas imposibles de crear en el mundo físico. Suena bien ¿Cierto? Pruébalo tú mismo." : description
	end

	def meta_keys keys
		return keys.empty? ? "" : "letrismo"
	end

	def show_svg(path)
		File.open("app/assets/images/#{path}", "rb") do |file|
			raw file.read
		end
	end

	def slugize(str)
		# Transliterate: Replaces non-ASCII characters with an ASCII approximation, or if none exists, a replacement character which defaults to “?”.
		# @see: https://apidock.com/rails/v5.2.3/ActiveSupport/Inflector/transliterate
		_slug = ActiveSupport::Inflector.transliterate(str)
		# downcase and remove extra spaces
		#@see: https://apidock.com/ruby/String/strip
		_slug = _slug.downcase.strip
		# convert spaces to '-'
		return _slug.gsub(/\W+/, "-")
		# return _slug.gsub(/[^0-9A-Za-z]/, '')
	end

	def breadcrumb(_url="")
		urls = ["Home"]
		urls << _url if _url.present?
		return urls.join(" > ")
	end

	def only_text(str)
		Nokogiri::HTML(str).text
	end

end