Jekyll::Hooks.register :documents, :post_render do |doc|
  if doc.output_ext == ".html"
    doc.output.gsub!('<div class="highlight">', '<div class="highlight"><div class="blockcopy"><span>content_copy</span><p>复制代码</p></div>')
    doc.output.gsub!('<figure class="highlight">', '<figure class="highlight"><div class="blockcopy"><span>content_copy</span><p>复制代码</p></div>')
  end
end
