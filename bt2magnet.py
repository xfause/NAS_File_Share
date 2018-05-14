import bencodepy
import hashlib
import base64
import urllib
import sys

def bt2magnet(f):
    metadata = bencodepy.decode_from_file(f)
    # print(metadata)
    subj = metadata[b'info']
    hashcontents = bencodepy.encode(subj)
    digest = hashlib.sha1(hashcontents).digest()
    b32hash = base64.b32encode(digest).decode()
    print('magnet:?'
          + 'xt=urn:btih:' + b32hash
          + '&dn=' + metadata[b'info'][b'name'].decode()
          + '&tr=' + metadata[b'announce'].decode()
          + '&xl=' + str(metadata[b'info'][b'piece length'])
          )
    return 'magnet:?'\
        + 'xt=urn:btih:' + b32hash\
        + '&dn=' + metadata[b'info'][b'name'].decode()\
        + '&tr=' + metadata[b'announce'].decode()\
        + '&xl=' + str(metadata[b'info'][b'piece length'])
