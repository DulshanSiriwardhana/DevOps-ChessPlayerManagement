pipeline {
    agent any

    environment {
        NODE_VERSION = '18.17.1'
        MONGODB_DOCKER_PORT = '27017' // Adjust if different
        IMAGE_BACKEND = 'mern-backend'
        IMAGE_FRONTEND = 'mern-frontend'
        IMAGE_MONGODB = 'mongo:latest'
        DOCKER_REGISTRY = '' // Specify your Docker registry if using a private registry
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    // Clone the repository
                    git 'https://github.com/your/repository.git'

                    // Ensure .env file exists in the root directory
                    writeFile file: '.env', text: '''
                    MONGODB_URL=mongodb://mongodb_server:${MONGODB_DOCKER_PORT}/your_db
                    MONGODB_DOCKER_PORT=${MONGODB_DOCKER_PORT}
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_BACKEND}:${NODE_VERSION}", "-f backend/Dockerfile ./backend")
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_FRONTEND}:${NODE_VERSION}", "-f frontend/Dockerfile ./frontend")
                }
            }
        }

        stage('Start MongoDB') {
            steps {
                script {
                    // Start MongoDB container
                    sh "docker run -d --rm --name mongodb_server -p ${MONGODB_DOCKER_PORT}:${MONGODB_DOCKER_PORT} ${IMAGE_MONGODB}"
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    // Deploy backend and frontend services using Docker Compose
                    sh "docker-compose up -d backend frontend"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run backend tests
                    sh "docker-compose run --rm backend npm test"
                }
            }
        }
    }

    post {
        always {
            // Cleanup Docker containers and volumes
            script {
                sh "docker-compose down -v --remove-orphans"
                sh "docker stop mongodb_server"
                sh "docker rmi ${DOCKER_REGISTRY}/${IMAGE_BACKEND}:${NODE_VERSION} || true"
                sh "docker rmi ${DOCKER_REGISTRY}/${IMAGE_FRONTEND}:${NODE_VERSION} || true"
            }
        }
    }
}
