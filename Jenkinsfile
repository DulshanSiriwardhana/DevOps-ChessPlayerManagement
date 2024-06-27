pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker-compose -f ${COMPOSE_FILE} up --build -d'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker-compose -f ${COMPOSE_FILE} down'
            }
        }
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
