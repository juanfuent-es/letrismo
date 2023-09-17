json.extract! @page, :id, :title, :content, :og_image
json.blocks @page.blocks do |block|
    json.extract! block, :id, :content, :title, :image, :number, :open
end