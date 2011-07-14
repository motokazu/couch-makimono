from makimono import util
import unittest

class TestUtil(unittest.TestCase):
    def setUp(self):
        pass

    def test_is_valid_item_id(self):
        self.assert_(util.is_valid_path('foo'))
        self.assert_(util.is_valid_path('foo/bar'))
        self.assert_(util.is_valid_path('/foo'))
        self.assert_(util.is_valid_path('/foo/bar'))
        self.assert_(not util.is_valid_path('/foo/bar/'))
        self.assert_(not util.is_valid_path('./foo'))
        self.assert_(not util.is_valid_path('/foo/../bar'))

if __name__ == '__main__':
    unittest.main()
    
