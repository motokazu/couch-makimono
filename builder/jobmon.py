#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

     Makimono project job monitoring sciprt
     ================================================================

     :copyright: Copyright 2011 by Yohei Sasaki <yssk22@gmail.com>
     :license: MIT license

     Usage
     ----------------------------------------------------------------

     jobmon.py -d {DB_URL} -w {WORKDIR}

     - {DATABASE} : database url where job documents are stored.
     - {WORKDIR} : directory path used for executing jobs.

"""
import os, sys
from optparse import OptionParser
from couchdbkit import *
from makimono.sphinx import Publisher
import json
import traceback

JOBMON_APPPATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '_design'))
JOBMON_TIMEOUT = 60000

parser = OptionParser()
parser.add_option("-d", "--database", dest="database",
                  help="database url where job documents are stored",
                  default="http://localhost:5984/makimono-jobs",
                  metavar="DATABASE")
parser.add_option("-w", "--workdir",  dest="workdir",
                  help="directory path used for executing jobs",
                  default="/tmp",
                  metavar="WORKDIR")
(options, args) = parser.parse_args()


db = Database(uri=options.database)
designer.fs.pushapps(JOBMON_APPPATH, db)

consumer = Consumer(db)
def process_doc(line):
    if line.has_key('id'):
        try:
            doc_id = line['id']
            # TODO multi-treaded.
            doc = db.get(doc_id)
            publisher = Publisher(db, doc, workdir = options.workdir)
            publisher.publish()
        except:
            traceback.print_exc()
    else:
        # last seq notification
        pass

while True:
    consumer.wait(process_doc, feed="continuous", filter="jobmon/newjobs", 
                  timeout=JOBMON_TIMEOUT)
