class SiteInfoController < ApplicationController

  def manifest
    @base_path = "https://equills.letrismo.com/"
    render json: {
      "name": "Letrismo",
      "short_name": "Letrismo",
      "description": "",
      "icons": [
        { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
        # { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
      ],
      "start_url": "/?source=pwa",
      "scope": "/",
      "theme_color": "#ffffff",
      "background_color": "#ffffff",
      "display": "standalone"
    }
  end

end