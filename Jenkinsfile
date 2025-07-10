pipeline {
  agent any

  environment {
    TARGET_COMPANY = "${params.TARGET_COMPANY}"
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
          def company = env.TARGET_COMPANY.toUpperCase()
          def credsId = "${company}_CREDS"
          def userKey = "${company}_USER"
          def passKey = "${company}_PASS"

          withCredentials([usernamePassword(credentialsId: credsId, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            def envContent = """\
TARGET_COMPANY=${env.TARGET_COMPANY}
${userKey}=${env.USER}
${passKey}=${env.PASS}
"""
            writeFile file: '.env', text: envContent.stripIndent()
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

    stage('Verificar reporte') {
      steps {
        sh '''
          echo "Contenido de playwright-report:"
          ls -l playwright-report || echo "No se encontró el directorio"
          chmod -R 755 playwright-report || true
        '''
      }
    }
  }

  post {
    always {
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Reporte Playwright'
      ])

      archiveArtifacts artifacts: 'test-results/**/*.zip', fingerprint: true
    }
  }
}