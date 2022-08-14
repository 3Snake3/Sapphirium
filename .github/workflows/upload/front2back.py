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


def main():
    for asset in assets:
        front = os.path.join(sapphirium, asset)
        back = os.path.join(backEndBranch, asset)
        # Delete old assets
        removeFileOrFolder(back)
        print(f"[front2back] {asset} in old {back} is removed.")
        # Copy new assets
        copyFileOrFolder(src=front, dst=back)
        print(f"[front2back] new {asset} in front {front} is added.")


if __name__ == '__main__':
    main()
