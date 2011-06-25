''' Sphinx Helper library
'''
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
BUILDDIR      = build

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source

.PHONY: help clean html dirhtml singlehtml pickle json htmlhelp qthelp devhelp epub latex latexpdf text man changes linkcheck doctest

html:
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

epub:
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

"""

BUILD_DIRECTORY = '/tmp'

class Publisher(object):
    def __init__(self, doc):
        self._doc = doc
        self._root = os.path.join(BUILD_DIRECTORY, doc['_id'], doc['_rev'])

    def publish(self):
        self._deploy_fs()
        self._build()
        doc = self._make_document()
        self._cleanup()
        return doc

    def _generate_makefile(self):
        return MAKE_TEMPLATE

    def _generate_conf(self):
        doc = self._doc
        properties = {}
        properties['extensions'] = doc.get('extensions', [])
        properties['project_name'] = doc.get('name')
        properties['copyright'] = doc.get('copyright', '')
        properties['version'] = doc.get('version', '1.0.0')
        properties['release'] = doc.get('_rev')
        properties['author']  = doc.get('author', '')
        properties['publisher']  = doc.get('publisher', 'Couch-Makimono')
        return CONF_TEMPLATE % properties


    def _deploy_fs(self):
        root = self._root
        doc = self._doc
        source_dir = os.path.join(root, 'source')

        # create directory with template
        if not os.path.exists(source_dir):
            os.makedirs(os.path.join(source_dir))        
        with open(os.path.join(root, 'Makefile'), 'w') as f:
            f.write(self._generate_makefile())
        with open(os.path.join(source_dir, 'conf.py'), 'w') as f:
            f.write(self._generate_conf())
            
        # TODO: deploy all contents to the file system.
        pass


    def _build(self):
        root = self._root
        doc = self._doc
        command = "make html"
        proc = Popen(command, shell = True, cwd = root, stdout = PIPE)
        stdout, stderr = proc.communicate()
        return (proc.returncode, stdout, stderr)

    def _make_document(self):
        doc = {
            "type": "publish",
            }
        # TODO: collect contents as attachment
        return doc

    def _cleanup(self):
        # TODO: cleanup deployed contents to reduce disk usage.
        pass

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
