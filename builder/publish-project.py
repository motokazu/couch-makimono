#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

     Makimono project deletion script
     ================================================================

     :copyright: Copyright 2011 by Yohei Sasaki <yssk22@gmail.com>
     :license: MIT license

     Usage
     ----------------------------------------------------------------

     publish-project.py dburl

     :dburl: database URL such as http://admin:password@localhost:5984/project1

     Example
     ----------------------------------------------------------------

     $ publish-project.py http://admin:password@localhost:5984/project1
     {
        "ok": true,
        "urls" : {
           "epub": "http://localhost:5984/project1/publish/epub/",
           "html": "http://localhost:5984/project1/publish/html/"
        }
     }

"""
