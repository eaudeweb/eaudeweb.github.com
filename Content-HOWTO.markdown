# How to add news, clients, job listings #

## Setting up ##

This HowTo assumes you will be adding content using Cloud9. It also
assumes you already have a [GitHub](https://github.com/) account, and
that it has editing permissions for [the eaudeweb.github.com
repository](https://github.com/eaudeweb/eaudeweb.github.com).

First, go to [c9.io](http://c9.io/), create an account, and log in. From
your account page, click on the "+" button (where it says "Create a
project here"), and then "Clone from URL". Paste the following URL:

    git@github.com:eaudeweb/eaudeweb.github.com.git

It will instruct you to copy the public SSH key to your GitHub account
so please do that. You can use "Cloud9" as the title for this key. Then
go back to the Cloud9 page, click "OK", and in a few seconds the project
should be ready. Click on the green "Start editing" button.


## Editing ##

In the Cloud9 editor, run the following commands to bring your project
up to date:

    git fetch
    git reset origin/master --hard

After you make some changes (see below), to upload your work, run:

    git add .
    git commit -m "Add news item about some conference"
    git push

The message in the 2nd command should describe the changes you have
made. Also, if the 3rd command fails, it means someone else made changes
at the same time. Ask for help.

## Layout of files ##

News items, clients, and job listings are stored in files, respectively
in the folders `news/_posts`, `clients/_posts` and `team/_posts`. To add
a news item, for example, go to `news/_posts` and create a file. Be
careful with the filename, it should be in the format
`yyyy-mm-dd-TITLE.markdown`, like the existing files.

As for the file contents, start from an existing news item, and change
whatever is needed. The teaser is displayed on the homepage as-is, and
should be repeated in the body. The image normally resides in the
/images/ folder at the top of the repository. The body uses [Markdown
syntax](http://daringfireball.net/projects/markdown/syntax). Job
postings are very similar to news items, only with fewer fields.

Clients are different though: they have a fake date in the filename
(because it's mandatory) and another fake date in their metadata (used
for sorting on the homepage). They also have a teaser, and it should be
repeated in the body.
