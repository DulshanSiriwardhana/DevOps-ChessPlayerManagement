pipeline {
    agent any

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Initialize') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo "Running on Unix"'
                    } else {
                        powershell '''
                        try {
                            Invoke-WebRequest -Uri "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Windows-x86_64.exe" -OutFile "docker-compose.exe"
                        } catch {
                            Write-Error "Failed to download docker-compose: $_"
                            exit 1
                        }
                        '''
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Backend: Build and Test') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        echo "Building and testing backend on Unix"
                        npm run build:backend
                        npm run test:backend
                        '''
                    } else {
                        powershell '''
                        Write-Host "Building and testing backend on Windows"
                        npm run build:backend
                        npm run test:backend
                        '''
                    }
                }
            }
        }

        stage('Frontend: Build and Test') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        echo "Building and testing frontend on Unix"
                        npm run build:frontend
                        npm run test:frontend
                        '''
                    } else {
                        powershell '''
                        Write-Host "Building and testing frontend on Windows"
                        npm run build:frontend
                        npm run test:frontend
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        echo "Deploying on Unix"
                        # Add your Unix deployment commands here
                        '''
                    } else {
                        powershell '''
                        Write-Host "Deploying on Windows"
                        # Add your Windows deployment commands here
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'echo "Cleanup on Unix"'
                } else {
                    powershell 'echo "Cleanup on Windows"'
                }
            }
        }
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
