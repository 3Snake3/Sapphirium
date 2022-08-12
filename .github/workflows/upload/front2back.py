import sys
import os
from zipfile import ZipFile
import shutil

"""
In Python
------
- Step 1:
Git clone into `BackEndBranch` folder.
- Step 2:
Clear assets.
Then copy them from `master` branch.
------
Out Python
------
- Step 3:
Git push to `back-end`
"""

backEndBranch = "BackEndBranch"
sapphirium = "Sapphirium"

assets = [
    "bundles",
    "content",
    "sprites",
    "sounds",
    "sprites-override",
    "maps",
    "mod.hjson",
    "icon.png"
]


def removeFileOrFolder(path):
    if os.path.isfile(path):
        os.remove(path)
    elif os.path.isdir(path):
        shutil.rmtree(path)


def copyFileOrFolder(src, dst):
    if os.path.isfile(src):
        shutil.copy(src, dst)
    elif os.path.isdir(dst):
        shutil.copytree(src, dst)


def main():
    for asset in assets:
        front = os.path.join(sapphirium, asset)
        back = os.path.join(backEndBranch, asset)
        # Delete old assets
        removeFileOrFolder(back)
        # Copy new assets
        copyFileOrFolder(src=front, dst=back)


if __name__ == '__main__':
    main()
