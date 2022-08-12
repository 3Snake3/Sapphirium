from zipfile import ZipFile

deployJarFile = "build/tmp/deploy/Sapphirium.jar"
unzipDir = "UnzipJar"


def main():
    with ZipFile(deployJarFile, 'r') as jar:
        jar.extractall(unzipDir)


if __name__ == '__main__':
    main()
