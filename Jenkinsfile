

pipeline {
    agent any

    environment {
        APP_NAME = 'jenkins-ci-cd-demo'
        APP_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'docker version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${APP_NAME}:${BUILD_NUMBER} .'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    docker rm -f ${APP_NAME} || true

                    docker run -d \
                        --name ${APP_NAME} \
                        --restart unless-stopped \
                        -p 127.0.0.1:${APP_PORT}:3000 \
                        -e APP_VERSION=${BUILD_NUMBER} \
                        ${APP_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    for i in $(seq 1 15); do
                        if docker exec ${APP_NAME} node -e "
                            fetch('http://127.0.0.1:3000/health')
                              .then(r => {
                                if (!r.ok) process.exit(1);
                                return r.json();
                              })
                              .then(d => {
                                if (d.status !== 'UP') process.exit(1);
                                console.log(d);
                              })
                              .catch(() => process.exit(1));
                        "; then
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "Health check failed"
                    docker logs ${APP_NAME}
                    exit 1
                '''
            }
        }
    }
}

