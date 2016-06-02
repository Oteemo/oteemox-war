package com.oteemo.x.selenium;

import org.junit.runner.RunWith;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(glue = { "classpath:gov/uscourts/cases/selenium" }, strict = true, format = { "pretty", "html:target/cukes",
		"json:target/cukes/report.json", "junit:target/cukes/junit.xml" })
public class RunCukes {
}