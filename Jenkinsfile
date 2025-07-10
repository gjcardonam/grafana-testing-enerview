pipeline {
  agent any

  environment {
    TARGET_COMPANY = "${TARGET_COMPANY}"
    }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare environment') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'AKAKUS_CREDS', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            writeFile file: '.env', text: """
TARGET_COMPANY=${env.TARGET_COMPANY}
AKAKUS_USER=${env.USER}
AKAKUS_PASS=${env.PASS}
""".stripIndent()
          }
        }
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright install --with-deps || true'
        sh 'npx playwright test'
      }
    }
  }
}