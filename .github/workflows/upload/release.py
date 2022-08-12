import os
from fi import *
import zipfile

"""
In Python
------
- Step 1:
Create a folder named `Release`
Then copy all files into it.
- Step 2:
Delete excluded files.
- Step 3:
Create a zip.
------
Out Python
------
- Step 4:
Create a release draft.
"""

excluded = [
    "LICENSE",
    "README.md",
    ".github",
    ".gitignore",
    ".idea",
]

release = "Release"
sapphirium = "Sapphirium"


def main():
    os.mkdir(release)
    try:
        copyFileOrFolder(sapphirium, release)
    except:
        pass
    for ex in excluded:
        file = os.path.join(release, ex)
        removeFileOrFolder(file)
    with zipfile.ZipFile('Sapphirium.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipFilesInDir(release, zipf)


if __name__ == '__main__':
    main()
