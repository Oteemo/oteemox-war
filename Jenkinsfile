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
     sh "${mvnHome}/bin/mvn sonar:sonar; sleep 4"
   }, 'analyze with Fortify': {
     sh 'echo "write your deploy code here"; sleep 5;'
   }

   stage 'archive'
   archive 'target/*.jar'
}

node {
   def mvnHome = "/opt/maven/apache-maven-3.3.9";
   stage 'artifact & deploy to Development Environment'
   withEnv(['tomcat.url=http://development.oteemox.com:8080/manager/text', 'tomcat.id=tomcat', 'webapp.path=/Oteemo-X']) {
    sh "${mvnHome}/bin/mvn clean tomcat:undeploy tomcat:deploy; sleep 4"
   }

   stage 'deploy to SecurityTest with Nessus Scan'
   sh 'echo "write your deploy code here"; sleep 6;'
   
      stage 'deploy to Stage'
   input 'Proceed?'
   sh 'echo "write your deploy code here"; sleep 7;'
   archive 'target/*.jar'
}

node {
   stage 'system tests'
   vars.KUBE = sh (
    	script: 'make system-tests',
    	returnStdout: true
	).trim()
	echo "Kubernetes Cluster Commit: ${vars.KUBE}"
	
	stage 'login to Docker'
   vars.DOC = sh (
    	script: 'docker login -e "$DOCKER_EMAIL" -u "$DOCKER_USER" -p "$DOCKER_PASS"',
    	returnStdout: true
	).trim()
	echo "Kubernetes Cluster Commit: ${vars.DOC}"
	
	stage 'pushes to DockerHub'
   vars.HUB = sh (
    	script: 'make push',
    	returnStdout: true
	).trim()
	echo "Kubernetes Cluster Commit: ${vars.HUB}"
	
	stage 'Configure Kubernetes'
   vars.CKUBE = sh (
    	script: 'KUBECONFIG=/tmp/kubeconfig KUBECTL=/tmp/kubectl KTMPL=/tmp/ktmpl IMAGE_VERSION=$CIRCLE_SHA1',
    	returnStdout: true
	).trim()
	echo "Kubernetes Cluster Commit: ${vars.CKUBE}"
	
	stage 'Run Acceptance tests'
   vars.TSTS = sh (
    	script: 'make acceptance-tests',
    	returnStdout: true
	).trim()
	echo "Kubernetes Cluster Commit: ${vars.TSTS}"
}
