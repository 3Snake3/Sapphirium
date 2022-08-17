import sys
import os
from zipfile import ZipFile
import shutil
from fi import removeFileOrFolder
"""
In Python
------
- Step 1:
Git pull into `MasterBranch` folder.
- Step 2:
Extract deploy.jar to a temporary folder, named `OutJar`.
Then cd into it.
- Step 3:
Delete `icon.png` and `mod.hjson`.
- Step 4:
Copy all the files inside `OutJar` into the `master` folder recursively.
------
Out Python
------
- Step 5:
Git push to `master`
"""

deployJarFile = "Sapphirium/build/tmp/deploy/Sapphirium.jar"
outJarFile = "OutJar"
masterBranch = "MasterBranch"
excluded = [
    "mod.hjson",
    "icon.png",
    "bundles",
    "content",
    "maps",
    "scripts",
    "sounds",
    "sprites",
    "sprites-override"
]

def unzipDeployJar():
    with ZipFile(deployJarFile, 'r') as jar:
        jar.extractall(outJarFile)


def deleteExcludedFiles():
    for name in excluded:
        file = f"{outJarFile}/{name}"
        removeFileOrFolder(file)


def copyIntoMaster():
    shutil.copytree(src=outJarFile, dst=masterBranch, dirs_exist_ok=True)


def main():
    unzipDeployJar()
    deleteExcludedFiles()
    copyIntoMaster()


if __name__ == '__main__':
    main()
