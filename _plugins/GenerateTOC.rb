module Jekyll
  class GenerateTOC < Liquid::Tag

    def render(context)
      content = context.environments.first['page']['content']
      sections = content.scan(/<h1.*?id=['"]([^'"]+)['"].*?>(.*?)<\/h1>(.*?)?(?=<h1|\z)/im)

      result = sections.map.with_index do |(h1_id, h1_content, h2_content), index|
        h2_links = generate_h2_links(h2_content)
        summary_id = h2_links.empty? ? "JTM-C-NavigationDrawer-Item-Normal" : "JTM-C-NavigationDrawer-Item-Expandable"
        details_open = index.zero? ? " open" : ""
        "<details#{details_open}><summary id='#{summary_id}'><a href='##{h1_id}'>#{h1_content}</a></summary>#{h2_links}</details>"
      end.join("\n")

      return result
    end

    private

    def generate_h2_links(h2_content)
      h2_elements = h2_content.scan(/<h2.*?id=['"]([^'"]+)['"].*?>(.*?)<\/h2>/im)
      links = h2_elements.map { |id, h2_content| "<a href='##{id}'>#{h2_content}</a>" }

      return links.join()
    end
  end
end

Liquid::Template.register_tag('toc', Jekyll::GenerateTOC)
