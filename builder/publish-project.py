#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

     Makimono project publishing script
     ================================================================

     :copyright: Copyright 2011 by Yohei Sasaki <yssk22@gmail.com>
     :license: MIT license

     Usage
     ----------------------------------------------------------------

     publish-project.py project_doc_id

"""
import sys
from makimono.sphinx import Publisher
from couchdbkit import *

doc_id = sys.argv[1]

server = Server()
db = server['makimono']
doc = db.get(doc_id)

publisher = Publisher(doc)
publisher.publish()
