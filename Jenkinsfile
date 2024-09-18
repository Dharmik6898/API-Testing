pipeline {
    agent any

    environment {
        DOCKER_IMAGE_API = "my-api:latest"
        DOCKER_IMAGE_TESTS = "playwright-tests:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build API Docker Image') {
            steps {
                script {
                    // Build the API Docker image
                    sh 'docker build -t $DOCKER_IMAGE_API .'
                }
            }
        }

        stage('Run API Container') {
            steps {
                script {
                    // Start the API service
                    sh 'docker-compose up -d api'
                }
            }
        }

        stage('Build and Run Playwright Tests') {
            steps {
                script {
                    // Build the Playwright Docker image
                    sh 'docker build -t $DOCKER_IMAGE_TESTS -f Dockerfile.playwright .'

                    // Run the Playwright tests
                    sh 'docker-compose run --rm tests'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove containers after tests are run
                    sh 'docker-compose down'
                }
            }
        }
    }

    post {
        always {
            // Ensure we always clean up Docker after execution
            sh 'docker-compose down'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
