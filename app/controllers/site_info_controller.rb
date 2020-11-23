class SiteInfoController < ApplicationController

  def robots
    render plain: "User-agent: * \nAllow: /\nDisallow: /search/*\nSitemap: #{request.protocol}#{request.host_with_port}/sitemap.txt"
  end

  def manifest
    render json: {
      "name": "Letrismo",
      "short_name": "Letrismo",
      "description": "",
      "icons": [
        { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
        { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
      ],
      "start_url": "/?source=pwa",
      "scope": "/",
      "theme_color": "#ffffff",
      "background_color": "#ffffff",
      "display": "standalone"
    }
  end

  def sitemap
    @base_path = "#{request.protocol}#{request.host_with_port}"
  end

  def humans
  end

  def tech
  end

end