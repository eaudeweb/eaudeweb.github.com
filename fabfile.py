from fabric.api import run, cd

def deploy():
    with cd('edw-website'):
        run('git pull')
        run('jekyll --user=production')
