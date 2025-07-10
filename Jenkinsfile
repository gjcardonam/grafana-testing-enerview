pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.53.0-noble'
            args '-u root'
        }
    }

    environment {
        TARGET_COMPANY = 'Blackbeard'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
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