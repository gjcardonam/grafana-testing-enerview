pipeline {
    agent any

    environment {
        TARGET_COMPANY = 'Blackbeard'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/gjcardonam/grafana-testing-enerview.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
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