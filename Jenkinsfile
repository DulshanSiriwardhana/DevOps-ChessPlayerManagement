pipeline {
    agent any
    environment {
        // Define any global environment variables here
        NODE_VERSION = '18.17.1'
        DOCKER_COMPOSE_VERSION = '1.29.2'
    }
    stages {
        stage('Initialize') {
            steps {
                script {
                    try {
                        // Install Docker Compose if not already installed
                        sh 'curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                        sh 'chmod +x /usr/local/bin/docker-compose'
                        echo 'Initialize stage completed successfully!'
                    } catch (Exception e) {
                        echo 'Initialize stage failed!'
                        throw e
                    }
                }
            }
        }
        stage('Backend: Build and Test') {
            steps {
                dir('backend') {
                    script {
                        try {
                            // Build Docker image for the backend
                            sh 'docker build -t backend ./'
                            // Optional: Run tests for the backend here
                            echo 'Backend: Build and Test stage completed successfully!'
                        } catch (Exception e) {
                            echo 'Backend: Build and Test stage failed!'
                            throw e
                        }
                    }
                }
            }
        }
        stage('Frontend: Build and Test') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            // Build Docker image for the frontend
                            sh 'docker build -t frontend ./'
                            // Optional: Run tests for the frontend here
                            echo 'Frontend: Build and Test stage completed successfully!'
                        } catch (Exception e) {
                            echo 'Frontend: Build and Test stage failed!'
                            throw e
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    try {
                        // Deploy using Docker Compose
                        sh 'docker-compose -f docker-compose.yml up -d'
                        echo 'Deploy stage completed successfully!'
                    } catch (Exception e) {
                        echo 'Deploy stage failed!'
                        throw e
                    }
                }
            }
        }
    }
    post {
        always {
            // Cleanup unused Docker images and containers
            script {
                try {
                    sh 'docker system prune -f'
                    echo 'Cleanup completed successfully!'
                } catch (Exception e) {
                    echo 'Cleanup failed!'
                    throw e
                }
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}