pipeline {
    agent any

    environment {
        TARGET_COMPANY = 'Blackbeard'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright in Docker') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.53.0-noble'
                    args '-u root'
                }
            }
            steps {
                sh 'npm ci'

                withCredentials([
                    string(credentialsId: 'BLACKBEARD_USER', variable: 'BLACKBEARD_USER'),
                    string(credentialsId: 'BLACKBEARD_PASS', variable: 'BLACKBEARD_PASS')
                ]) {
                    sh '''
                        export BLACKBEARD_USER=$BLACKBEARD_USER
                        export BLACKBEARD_PASS=$BLACKBEARD_PASS
                        npx playwright test
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}