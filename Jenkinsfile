pipeline {
    agent any 

    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'test', url: 'https://github.com/DulshanSiriwardhana/DevOps-ChessPlayerManagement.git'
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {  
                dir('backend') {
                    bat 'docker build -t dulshansiriwardhana/backend:%BUILD_NUMBER% .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    bat 'docker build -t dulshansiriwardhana/frontend:%BUILD_NUMBER% .'
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'DOCKER_PASS', variable: 'DOCKER_PASS')]) {
                    script {
                        bat "docker login -u dulshansiriwardhana -p %DOCKER_PASS%"
                    }
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                bat 'docker push dulshansiriwardhana/backend:%BUILD_NUMBER%'
            }
        }
        stage('Push Frontend Image') {
            steps {
                bat 'docker push dulshansiriwardhana/frontend:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}