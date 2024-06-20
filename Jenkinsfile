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
                    def isUnix = isUnix()
                    if (isUnix) {
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

        stage('Backend: Build and Test') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                        # Unix commands for backend build and test
                        echo "Building and testing backend on Unix"
                        # Add your build and test commands here
                        '''
                    } else {
                        powershell '''
                        # Windows commands for backend build and test
                        Write-Host "Building and testing backend on Windows"
                        # Add your build and test commands here
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
                        # Unix commands for frontend build and test
                        echo "Building and testing frontend on Unix"
                        # Add your build and test commands here
                        '''
                    } else {
                        powershell '''
                        # Windows commands for frontend build and test
                        Write-Host "Building and testing frontend on Windows"
                        # Add your build and test commands here
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
                        # Unix commands for deployment
                        echo "Deploying on Unix"
                        # Add your deployment commands here
                        '''
                    } else {
                        powershell '''
                        # Windows commands for deployment
                        Write-Host "Deploying on Windows"
                        # Add your deployment commands here
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
    }
}
