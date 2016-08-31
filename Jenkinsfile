// Oteemo-X Jenkins Pipeline as Code.
node {
   // Mark the code checkout 'stage'....
   stage 'checkout'

   // Get Oteemo-X Spring Application code from GitHub repository
   git url: 'git@github.com:Oteemo/oteemox-war.git'
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
   }, 'analyze with SonarQube': {
    // sh "${mvnHome}/bin/mvn sonar:sonar; sleep 4"
   }, 'analyze with Fortify': {
     sh 'echo "write your deploy code here"; sleep 5;'
   }

   stage 'archive'
   archive 'target/*.jar'
}

node {
   def mvnHome = "/opt/maven/apache-maven-3.3.9";
   stage 'artifact & deploy to Development Environment'
   withEnv(['tomcat.url=http://laureate.oteemox.com:8080/manager/text', 'tomcat.id=tomcat', 'webapp.path=/Oteemo-X']) {
    sh "${mvnHome}/bin/mvn clean tomcat:undeploy tomcat:deploy; sleep 4"
   notifications = [
        email : "chris@oteemo.com"    
    ]
   }

   stage 'deploy to SecurityTest with Nessus Scan'
   sh 'echo "write your deploy code here"; sleep 6;'
   
      stage 'deploy to Stage'
   input 'Proceed?'
   sh 'echo "write your deploy code here"; sleep 7;'
   archive 'target/*.jar'
}