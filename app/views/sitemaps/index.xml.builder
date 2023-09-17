xml.instruct! :xml, :version=>"1.0"
xml.tag! 'urlset', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xmlns:image' => 'http://www.google.com/schemas/sitemap-image/1.1', 'xmlns:video' => 'http://www.google.com/schemas/sitemap-video/1.1' do
  @pages.each do |page|
    xml.url do
      xml.loc "#{@base_url}/#{page.lang}/#{page.slug}"
      xml.lastmod page.updated_at
      xml.changefreq 'monthly'
      xml.priority '.9'
    end
  end
end