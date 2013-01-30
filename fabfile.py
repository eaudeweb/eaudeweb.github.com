from fabric.api import run, cd, env

env['hosts'] = ['eaudeweb.ro']
env['use_ssh_config'] = True


def deploy():
    with cd('edw-website'):
        run('git pull')
        run('jekyll --user=production')
