import io.github.liplum.mindustry.*

plugins {
    java
    id("io.github.liplum.mgpp") version "1.1.10"
}

sourceSets {
    main {
        java.srcDirs("src")
    }
    test {
        java.srcDir("test")
    }
}
group= "adc"
version= "15.0"
java {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
}
repositories {
    mavenCentral()
    mindustryRepo()
}
dependencies {
    importMindustry()
    implementation("com.github.liplum:MultiCrafterLib:v1.7")
}
mindustry {
    dependency {
        mindustry on "v136"
        arc on "v136.1"
    }
    client {
        mindustry official "v137"
    }
    server {
        mindustry official "v137"
    }
    deploy {
        baseName = project.name
        version = ""
    }
}
mindustryAssets {
    root at "$projectDir/assets"
}