import os, sys
import json

# default configuraiton
config = {
    'database': "http://localhost:5984/makimono-jobs",
    'workdir' : "/tmp",
    'timeout' : 60000
}

def __load_rc_files(path):
    if os.path.exists(path):
        with open(path, 'r') as f:
            obj = json.loads(f.read())
            config.update(obj)
    return config

__load_rc_files('/etc/makimonorc')
__load_rc_files(os.path.join(os.environ['HOME'], '.makimonorc'))
__load_rc_files(os.path.join(os.getcwd(), '.makimonorc'))
