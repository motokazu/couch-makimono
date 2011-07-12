# -*- coding: utf-8 -*-
"""

     Makimono project utility library
     ================================================================

     :copyright: Copyright 2011 by Yohei Sasaki <yssk22@gmail.com>
     :license: MIT license

"""

import os, sys

from datetime import datetime
from couchdbkit import designer

APPPATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '_design'))

def datetime_str(t = datetime.utcnow()):
    return t.strftime("%Y-%m-%dT%H:%M:%S.%%3dZ") % (t.microsecond // 1000)

def sync_app(db):
    designer.fs.pushapps(APPPATH, db)
    
