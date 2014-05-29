# Website for Eau de Web #

This website is generated using [Jekyll][] with the source code managed
as a Git repository. A draft version is hosted [on github][github-draft]
and the public version is on [eaudeweb.ro][edw].

## Content organization ##

Content is taken from any file with the `.markdown` extension. There are
a few standalone pages, e.g. `index.markdown` for the homepage and
`news/2010.markdown` for the 2010 news archive. Other pages are taken
from blog-like lists of posts, for example `news/_posts`. Each Markdown
page has a *YAML front matter*, some metadata that describes the page:
title, name of layout template (see below), perhaps the path of a logo
or icon.

The `_posts` folders are useful for news items, but also for managing
many pieces of similar content: the sections of the homepage and the
list of clients. Let's call them "fake posts". Jekyll wants every post
to have a date, so our fake posts are dated "1 January 2000". They also
have a "date" value in their YAML front-matter so we can change the sort
order without renaming files. Each fake post results in a page;
sometimes this is useful (list of clients), sometimes not (sections of
the homepage) - but we just ignore them.

## Layout ##

All pages are rendered using templates found in the `_layout` folder. A
fair amount of transformation and organization happens in there,
especially on the homepage. Static resources are copied unmodified by
Jekyll.

## Making changes ##

To change any aspect of the site, edit the relevant files, then re-run
Jekyll. For quick changes to an existing file, GitHub has a built-in
editor. For a more friendly experience one can use [Cloud9][]: create an
account, import the github repository
(`git@github.com:eaudeweb/eaudeweb.github.com.git`), make some changes,
then, from the bottom console, run: `git add .`, `git commit -m "edit
content"`, `git push` (feel free to replace "edit content" with a more
useful explanation). The code is sent to GitHub, which will re-generate
the [draft website][github-draft], so you can see the results.

For a more efficient editing experience, install Jekyll locally, and
start it in the background with `jekyll --auto --serve`; it will serve
the website on port 4000 and automatically pick up any changes.

## Deployment ##

A Jekyll site is a collection of static files, so it can be served
straight from the filesystem by a web server like Apache.

To update the server:

1. Log in to the webserver(ssh eaudeweb.ro)
2. su -
3. cd /var/local/edw-website
4. git pull
5. jekyll build _config_production.yml

If you have an error like "Could not find a JavaScript runtime" when you build
you should install a javascript runtime library like nodejs


## External documentation ##

* [Markdown syntax](http://daringfireball.net/projects/markdown/syntax)


[jekyll]: http://jekyllrb.com/
[github-draft]: http://eaudeweb.github.com/
[edw]: http://eaudeweb.ro/
[cloud9]: http://c9.io/
