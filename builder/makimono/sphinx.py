# -*- coding: utf-8 -*-
"""

     Makimono project sphinx helper library
     ================================================================

     :copyright: Copyright 2011 by Yohei Sasaki <yssk22@gmail.com>
     :license: MIT license

"""

import sys, os
from subprocess import Popen, PIPE

CONF_TEMPLATE = """
import sys, os
extensions = %(extensions)s
source_suffix = '.rst'
master_doc = 'index'
project = u'%(project_name)s'
copyright = u'%(copyright)s'
version = u'%(version)s'
release = u'%(release)s'

epub_title = u'%(project_name)s'
epub_author = u'%(author)s'
epub_publisher = u'%(publisher)s'
epub_copyright = u'%(copyright)s'

pygments_style = 'sphinx'
html_static_path = ['_static']
"""

MAKE_TEMPLATE = """
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
PAPER         =
BUILDDIR      = build/_attachments

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source

.PHONY: help clean html dirhtml singlehtml pickle json htmlhelp qthelp devhelp epub latex latexpdf text man changes linkcheck doctest

html:
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html

epub:
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub

"""
import os, sys
import shutil
from traceback import format_exception
from makimono.util import datetime_str
from couchdbkit import Database
from couchdbkit.designer.fs import FSDoc

class Publisher(object):
    def __init__(self, db, doc, workdir = '/tmp'):
        self._job_db = db
        self._job_doc = doc
        self._project_db = Database(uri = os.path.join(db.server_uri , doc['args']['database']))
        self._root = os.path.join(workdir, doc['args']['database'], doc['_id'])

    def publish(self):
        self._lock_job()
        try:
            self._deploy_fs()
            self._build('html')
            self._build('epub')
            self._store_result()
            self._cleanup()
            self._mark_success()
        except:
            self._mark_failed()
            raise

    def _lock_job(self):
        db = self._job_db
        doc = self._job_doc
        doc['status'] = 'processing'
        doc['updated_at'] = datetime_str()
        db.save_doc(doc)

    def _mark_success(self):
        db = self._job_db
        doc = self._job_doc
        doc['status'] = 'success'
        doc['updated_at'] = datetime_str()
        db.save_doc(doc)
        
    def _mark_failed(self):
        exc_type, exc_value, exc_traceback = sys.exc_info()
        db = self._job_db
        doc = self._job_doc
        doc['status'] = 'failed'
        doc['error'] = exc_value.__repr__()
        doc['trace'] = format_exception(exc_type, exc_value, exc_traceback)
        doc['updated_at'] = datetime_str()
        db.save_doc(doc)


    def _generate_makefile(self):
        return MAKE_TEMPLATE

    def _generate_conf(self, project_doc):
        sphinx_attrs = project_doc.get('sphinx', {}) or {}
        properties = {}
        properties['project_name'] = project_doc.get('name')
        properties['release'] = project_doc.get('_rev').split('-')[0]
        properties['extensions'] = sphinx_attrs.get('extensions', [])
        properties['copyright'] = sphinx_attrs.get('copyright', '')
        properties['version'] = sphinx_attrs.get('version', '1.0.0')
        properties['author']  = sphinx_attrs.get('author', '')
        properties['publisher']  = sphinx_attrs.get('publisher', 'Couch-Makimono')
        return CONF_TEMPLATE % properties

    def _deploy_fs(self):
        root = self._root
        project_db = self._project_db

        source_dir = os.path.join(root, 'source')
        # create directory with template
        if not os.path.exists(source_dir):
            os.makedirs(os.path.join(source_dir))
            os.makedirs(os.path.join(source_dir, '_static'))

        with open(os.path.join(root, 'Makefile'), 'w') as f:
            f.write(self._generate_makefile())

        # TODO: use efficient view
        for doc in project_db.all_docs(include_docs=True):
            doc = doc['doc']
            t = doc.get('type', None)
            if t == 'project':
                with open(os.path.join(source_dir, 'conf.py'), 'w') as f:
                    f.write(self._generate_conf(doc))
            elif t == 'item':
                filepath = doc['_id']
                # source
                with open(os.path.join(source_dir, filepath), 'w') as f:
                    f.write(doc['source'].encode('utf-8'))
                # TODO: attachements
            else:
                # unknown doc or design doc
                pass

    def _build(self, t):
        root = self._root
        command = "make %s" % t
        proc = Popen(command, shell = True, cwd = root, stdout = PIPE)
        stdout, stderr = proc.communicate()
        return (proc.returncode, stdout, stderr)

    def _store_result(self):
        root = self._root
        project_db = self._project_db
        # TODO: maybe heavy bottlenecks, fix me for performance tu
        doc = FSDoc(os.path.join(root, 'build'), is_ddoc=False).doc(project_db)
        now = datetime_str()
        doc['created_at'] = now
        doc['updated_at'] = now
        doc['type'] = 'build'
        project_db.save_doc(doc, encode_attachments=False, force_update=True)

    def _cleanup(self):
        root = self._root
        shutil.rmtree(root)

# adhoc testing, 
if __name__ == "__main__":
    doc = {
        '_id' : '69f333162df1844f82647e08ea00159f',
        '_rev' : '1-06440c1f1a61c8c52014e6423414e109',
        'name' : 'test project',
        'type' : 'project',
        # 'copyright' : '2011 (c) makimono project',
        # 'version' : '0.1.0',
        # 'author' : 'yssk22',
        }
    pub = Publisher(doc)
    pub.publish()
