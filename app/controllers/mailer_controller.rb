class MailerController < ApplicationController
  layout "mailer"

  def mail
    @domain = "http://localhost:3000"
    @fontfamily = "font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';";
    @footer_font = "#{@fontfamily}font-size:12px;font-weight:400;line-height:22px;";
    @link_color = "#55859a";
    @font = "color:#AAA;#{@fontfamily}font-size:16px;font-style:normal;font-weight:400;line-height:20px;letter-spacing:normal;margin:0;padding:0;text-align:center;"
    @footer_link = "#{@footer_font}color:#{@link_color};font-weight:500;text-decoration:underline;";
    @border = "#34d399"
    @background = "#172138"
    @foreground = "#111827"
    @address = "La Calle de mi casa #No X • Exterior Y • Estado, CP 000 Mexico"
  end
end