pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('97052fb7-5dfa-4057-98c1-2e30891133d2')
        DOCKER_IMAGE_TAG = "devops-chess"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/DulshanSiriwardhana/DevOps-ChessPlayerManagement.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        // Build the backend Docker image
                        docker.build("dulshansiriwardhana/backend:${DOCKER_IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        // Build the frontend Docker image
                        docker.build("dulshansiriwardhana/frontend:${DOCKER_IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_HUB_CREDENTIALS') {
                        // Push the backend image
                        docker.image("your-dockerhub-username/backend:${DOCKER_IMAGE_TAG}").push()
                        // Push the frontend image
                        docker.image("your-dockerhub-username/frontend:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the application using Docker Compose
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
        success {
            // Notify about the successful deployment
            echo 'Deployment successful!'
        }
        failure {
            // Notify about the failed deployment
            echo 'Deployment failed!'
        }
    }
}
