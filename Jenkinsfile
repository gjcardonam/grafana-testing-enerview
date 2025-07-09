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
                // Asumiendo que tienes Node.js instalado
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withEnv(["$(cat .env | xargs)"]) {
                    sh 'npx playwright test'
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
