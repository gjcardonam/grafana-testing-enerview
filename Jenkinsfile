pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root'  // para poder instalar dependencias si es necesario
        }
    }

    environment {
        TARGET_COMPANY = 'Blackbeard'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/gjcardonam/grafana-testing-enerview.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Si tienes un archivo .env, asegúrate de cargarlo antes
                sh '''
                    if [ -f .env ]; then
                        export $(cat .env | xargs)
                    fi
                    npx playwright test
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}