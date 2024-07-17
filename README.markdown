# Website for Eau de Web #

This website is generated and served using [GitHub Pages][github-pages] and [Jekyll][].
The build settings can be changed from the [Pages section of eaudeweb.github.com][github-pages-settings].
The public version can be seen on [eaudeweb.ro][edw] and [eaudeweb.github.io][github-io].

## Content organization ##

Content is taken from any file with the `.markdown` extension. There are
a few standalone pages, e.g. `index.markdown` for the homepage and
`news/2010.markdown` for the 2010 news archive.
News items, clients, and job listings are stored in files, respectively
in the folders `news/_posts`, `clients/_posts` and `team/_posts`.
To add a job listing, go to `team/_posts` and create a file.
Be careful with the filename, it should be in the format
`yyyy-mm-dd-TITLE.markdown`, like the existing files.

Each Markdown page has a *YAML front matter*, some metadata that describes the page:
title, name of layout template (see below), perhaps the path of a logo or icon.

The `_posts` folders are also useful for managing pieces of similar content, such as
the sections of the homepage and the list of clients. Let's call them "fake posts".
Jekyll wants every post to have a date, so our fake posts are dated "1 January 2000". They also
have a "date" value in their YAML front-matter so we can change the sort order without renaming files.
Each fake post results in a page; sometimes this is useful (list of clients), sometimes not (sections of
the homepage) - but we just ignore them.

## Layout ##

All pages are rendered using templates found in the `_layout` folder.
A fair amount of transformation and organization happens in there, especially on the homepage.
Static resources are copied unmodified by Jekyll.

## Making changes ##

To change any aspect of the site, edit the relevant files, push the changes, then wait for GitHub to run the build.
For a more efficient editing experience, run Jekyll locally, and start it in the background using
`docker run --rm -p 4000:4000 -v ".:/site" bretfisher/jekyll-serve`.
It will serve the website on local port 4000 and automatically pick up any changes.

## External documentation ##

* [Markdown syntax](https://daringfireball.net/projects/markdown/syntax)

[jekyll]: https://jekyllrb.com/
[github-pages]: https://pages.github.com/
[github-io]: https://eaudeweb.github.io/
[github-pages-settings]: https://github.com/eaudeweb/eaudeweb.github.com/settings/pages/
[edw]: https://eaudeweb.ro/
