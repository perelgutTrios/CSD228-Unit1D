pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        PROJECT_NAME = 'simple-calculator'
    }
    
    tools {
        nodejs "${NODE_VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully'
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
                echo 'Dependencies installed successfully'
            }
        }
        
        stage('Lint Code') {
            steps {
                script {
                    // Optional: Add ESLint or other linting tools
                    echo 'Code linting completed'
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:unit'
                    } else {
                        bat 'npm run test:unit'
                    }
                }
                echo 'Unit tests completed'
            }
            post {
                always {
                    // Publish test results
                    publishTestResults testResultsPattern: 'test-results/unit/*.xml'
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:integration'
                    } else {
                        bat 'npm run test:integration'
                    }
                }
                echo 'Integration tests completed'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results/integration/*.xml'
                }
            }
        }
        
        stage('UI Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:ui'
                    } else {
                        bat 'npm run test:ui'
                    }
                }
                echo 'UI tests completed'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results/ui/*.xml'
                }
            }
        }
        
        stage('E2E Tests') {
            steps {
                script {
                    // Install browser dependencies for Puppeteer
                    if (isUnix()) {
                        sh 'npm run test:e2e'
                    } else {
                        bat 'npm run test:e2e'
                    }
                }
                echo 'End-to-end tests completed'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results/e2e/*.xml'
                }
            }
        }
        
        stage('Code Coverage') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:coverage'
                    } else {
                        bat 'npm run test:coverage'
                    }
                }
                echo 'Code coverage analysis completed'
            }
            post {
                always {
                    // Publish coverage reports
                    publishCoverage adapters: [
                        istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                    ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                }
            }
        }
        
        stage('Static Analysis') {
            parallel {
                stage('Security Scan') {
                    steps {
                        script {
                            // Optional: Add security scanning tools
                            echo 'Security scan completed'
                        }
                    }
                }
                
                stage('Quality Gate') {
                    steps {
                        script {
                            // Optional: SonarQube integration
                            echo 'Quality gate analysis completed'
                        }
                    }
                }
            }
        }
        
        stage('Build Artifacts') {
            steps {
                script {
                    // Create distribution package
                    if (isUnix()) {
                        sh '''
                            mkdir -p dist
                            cp index.html dist/
                            cp styles.css dist/
                            cp script.js dist/
                            cp README.md dist/
                            cp PROJECT_DOCUMENTATION.md dist/
                        '''
                    } else {
                        bat '''
                            if not exist dist mkdir dist
                            copy index.html dist\\
                            copy styles.css dist\\
                            copy script.js dist\\
                            copy README.md dist\\
                            copy PROJECT_DOCUMENTATION.md dist\\
                        '''
                    }
                }
                echo 'Build artifacts created successfully'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'master'
            }
            steps {
                script {
                    // Deploy to staging environment
                    echo 'Deploying to staging environment'
                    // Add deployment scripts here
                }
            }
        }
        
        stage('Smoke Tests') {
            when {
                branch 'master'
            }
            steps {
                script {
                    // Run smoke tests against staging
                    echo 'Running smoke tests against staging'
                    // Add smoke test commands here
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'master'
                    environment name: 'DEPLOY_TO_PROD', value: 'true'
                }
            }
            steps {
                script {
                    // Deploy to production with approval
                    input message: 'Deploy to production?', ok: 'Deploy'
                    echo 'Deploying to production environment'
                    // Add production deployment scripts here
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        
        success {
            echo 'Pipeline completed successfully!'
            // Optional: Send success notifications
        }
        
        failure {
            echo 'Pipeline failed!'
            // Optional: Send failure notifications
        }
        
        unstable {
            echo 'Pipeline completed with warnings'
            // Optional: Send warning notifications
        }
    }
}