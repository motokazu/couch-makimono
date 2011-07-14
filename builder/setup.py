#!/usr/bin/env python

import os
import glob
from distutils.core import setup

print glob.glob(os.path.join(os.path.dirname(__file__), '_design/jobmon/filters/*.js'))
setup(name="couchmakimono",
      version="0.1.0",
      description="command line script tools for couch-makimono",
      author="Yohei Sasaki",
      url="https://github.com/motokazu/couch-makimono",
      packages=["makimono"],
      package_data = {
        'makimono' : ['_design/jobmon/filters/*.js']
        },
      scripts=['scripts/makimono-jobmon'])
