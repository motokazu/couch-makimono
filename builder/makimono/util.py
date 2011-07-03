from datetime import datetime

def datetime_str(t = datetime.utcnow()):
    return t.strftime("%Y-%m-%dT%H:%M:%S.%%3dZ") % (t.microsecond // 1000)

