pipeline {
    agent any 

    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    script {
                        try {
                            git branch: 'test', url: 'https://github.com/DulshanSiriwardhana/DevOps-ChessPlayerManagement.git'
                        } catch (err) {
                            error("Checkout failed: ${err}")
                        }
                    }
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {  
                script {
                    dir('backend') {
                        try {
                            bat 'docker build -t dulshansiriwardhana/backend:%BUILD_NUMBER% .'
                        } catch (err) {
                            error("Backend Docker image build failed: ${err}")
                        }
                    }
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        try {
                            bat 'docker build -t dulshansiriwardhana/frontend:%BUILD_NUMBER% .'
                        } catch (err) {
                            error("Frontend Docker image build failed: ${err}")
                        }
                    }
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: '97052fb7-5dfa-4057-98c1-2e30891133d2', variable: 'DOCKERHUB_PASS')]) {
                        try {
                            bat "echo Logging into Docker Hub"
                            bat "docker login -u dulshansiriwardhana -p %DOCKERHUB_PASS%"
                        } catch (err) {
                            error("Docker Hub login failed: ${err}")
                        }
                    }
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                script {
                    try {
                        bat 'docker push dulshansiriwardhana/backend:%BUILD_NUMBER%'
                    } catch (err) {
                        error("Push Backend Image failed: ${err}")
                    }
                }
            }
        }
        stage('Push Frontend Image') {
            steps {
                script {
                    try {
                        bat 'docker push dulshansiriwardhana/frontend:%BUILD_NUMBER%'
                    } catch (err) {
                        error("Push Frontend Image failed: ${err}")
                    }
                }
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
        failure {
            echo 'Build failed. Please check the logs for more details.'
        }
    }
}