plugins {
	java
	id("org.springframework.boot") version "4.0.4"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.movieapp"
version = "0.0.1-SNAPSHOT"
description = "Demo project for Spring Boot"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {

	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-webmvc")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("com.cloudinary:cloudinary-http44:1.29.0")
	implementation("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
	implementation ("com.turkraft.springfilter:jpa:3.1.7")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok-mapstruct-binding:0.2.0")

	runtimeOnly("com.mysql:mysql-connector-j")

	testImplementation("org.springframework.boot:spring-boot-starter-data-jpa-test")
	testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

	developmentOnly("org.springframework.boot:spring-boot-devtools")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
