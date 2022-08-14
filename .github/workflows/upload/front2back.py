import os
from fi import *

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

backEndBranch = "BackEndBranch/assets"
sapphirium = "Sapphirium"

IsFile = False
IsDir = True


def File(s):
    return s, IsFile


def Dir(s):
    return s, IsDir


assets = [
    Dir("bundles"),
    Dir("content"),
    Dir("sprites"),
    Dir("sounds"),
    Dir("sprites-override"),
    Dir("maps"),
    File("mod.hjson"),
    File("icon.png")
]


def toStatus(b):
    return "YES" if b else "NO"


def main():
    print("front2back started...")
    for asset, isDir in assets:
        front = os.path.join(sapphirium, asset)
        back = os.path.join(backEndBranch, asset)
        print(f"back<{asset}> {toStatus(os.path.exists(back))};front<{asset}> {toStatus(os.path.exists(front))}")
        # Delete old assets
        removeFileOrFolder(back)
        # Copy new assets
        copyFileOrFolder(src=front, dst=back, isDir=isDir)
        print(f"Copied {asset} from {os.path.abspath(front)} to {os.path.abspath(back)}.")
    print("front2back ended...")


if __name__ == '__main__':
    main()
