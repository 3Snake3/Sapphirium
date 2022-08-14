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
    print("front2back started...")
    for asset in assets:
        front = os.path.join(sapphirium, asset)
        back = os.path.join(backEndBranch, asset)
        print(f"back<{asset}> exists = {os.path.exists(back)}")
        print(f"front<{asset}> exists = {os.path.exists(front)}")
        # Delete old assets
        removeFileOrFolder(back)
        # Copy new assets
        copyFileOrFolder(src=front, dst=back)
        print(f"Copied {asset} from {os.path.abspath(back)} to {os.path.abspath(front)}.")
    print("front2back ended...")


if __name__ == '__main__':
    main()
