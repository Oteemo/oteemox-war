// see https://dzone.com/refcardz/continuous-delivery-with-jenkins-workflow for tutorial
// see https://documentation.cloudbees.com/docs/cookbook/_pipeline_dsl_keywords.html for dsl reference
node {
   // Mark the code checkout 'stage'....
   stage 'checkout'

   // Get some code from a GitHub repository
   git url: 'git@github.com:Oteemo/Oteemo-X.git'
   sh 'git clean -fdx; sleep 4;'

   // Get the maven tool.
   // ** NOTE: This 'mvn' maven tool must be configured
   // **       in the global configuration.
   def mvnHome = "/opt/maven/apache-maven-3.3.9";

   stage 'build'
   sh "${mvnHome}/bin/mvn versions:set -DnewVersion=${env.BUILD_NUMBER}"
   sh "${mvnHome}/bin/mvn package"

   stage 'test'
   parallel 'test': {
     sh "${mvnHome}/bin/mvn test; sleep 2;"
   }, 'verify': {
     sh "${mvnHome}/bin/mvn verify; sleep 3"
   }, 'analyze with SonarQube': {
     sh "${mvnHome}/bin/mvn sonar:sonar; sleep 4"
   }, 'analyze with Fortify': {
     sh 'echo "write your deploy code here"; sleep 5;'
   }

   stage 'archive'
   archive 'target/*.jar'
}


node {
   stage 'artifact & deploy to Integration'
   withEnv(['tomcat.url=http://54.172.145.201:8080/manager/text', 'tomcat.id=tomcat', 'webapp.path=/Oteemo-X']) {
    sh "${mvnHome}/bin/mvn clean tomcat:undeploy deploy; sleep 4"
   }

   stage 'deploy to SecurityTest with Nessus Scan'
   sh 'echo "write your deploy code here"; sleep 6;'
   
      stage 'deploy to Stage'
   input 'Proceed?'
   sh 'echo "write your deploy code here"; sleep 7;'
   archive 'target/*.jar'
}
