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
     sh "${mvnHome}/bin/mvn test;"
   }, 'analyze with SonarQube': {
     sh "${mvnHome}/bin/mvn sonar:sonar;"
   }, 'analyze with FindBugs': {
     sh "${mvnHome}/bin/mvn compile;"
     sh "${mvnHome}/bin/mvn findbugs:findbugs;"
   }, 'analyze with NexusIQ': {
     sh "/usr/local/bin/mvn com.sonatype.clm:clm-maven-plugin:evaluate -Dclm.applicationId=organization -Dclm.serverUrl=http://USCOURTS.nexus-iq.oteemox.com:8070;"
   }

   stage 'archive'
   archive 'target/*.jar'
}

node {
   def mvnHome = "/opt/maven/apache-maven-3.3.9";
   stage 'artifact & deploy to Development Environment'
   withEnv(['tomcat.url=http://uscourts.oteemox.com:8080/manager/text', 'tomcat.id=tomcat', 'webapp.path=/Oteemo-X']) {
    sh "${mvnHome}/bin/mvn clean tomcat:undeploy tomcat:deploy;"
   }
   
   stage 'deploy to Stage'
   input 'Proceed?'
   sh 'echo "write your deploy code here";'
   archive 'target/*.jar'
}