// Oteemo-X Jenkins Pipeline as Code.
node {
   def mvnHome = "/opt/maven/apache-maven-3.3.9";
   
   // Mark the code checkout 'stage'....
   stage 'checkout'

   // Get Oteemo-X Spring Application code from GitHub repository
   git url: 'git@github.com:Oteemo/oteemox-war.git'
   sh 'git clean -fdx;'

   // Get the maven tool.
   // ** NOTE: This 'mvn' maven tool must be configured
   // **       in the global configuration.

   stage 'build'
   sh "/opt/maven/apache-maven-3.3.9/bin/mvn versions:set -DnewVersion=${env.BUILD_NUMBER}"
   sh "/opt/maven/apache-maven-3.3.9/bin/mvn package"

   stage 'test'
   parallel 'test': {
     sh "/opt/maven/apache-maven-3.3.9/bin/mvn test;"
   }, 'analyze with SonarQube': {
     sh "/opt/maven/apache-maven-3.3.9/bin/mvn sonar:sonar;"
   }, 'analyze with FindBugs': {
     sh "/opt/maven/apache-maven-3.3.9/bin/mvn compile;"
     sh "/opt/maven/apache-maven-3.3.9/bin/mvn findbugs:findbugs;"
   }, 'analyze with NexusIQ': {
     // sh "/usr/local/bin/mvn com.sonatype.clm:clm-maven-plugin:evaluate -Dclm.applicationId=organization -Dclm.serverUrl=http://cbiit.nexus-iq.oteemo-x.com:8070;"
     sh 'echo "write your nexusIQ code here";'
   }

   stage 'artifact & deploy to Development Environment'
   sh "/opt/maven/apache-maven-3.3.9/bin/mvn clean tomcat:undeploy tomcat:deploy;"
   
   stage 'deploy to Stage'
   input 'Proceed?'
   sh 'echo "write your deploy code here";'
   archive 'target/*.jar'
}