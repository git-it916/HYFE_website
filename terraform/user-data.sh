#!/bin/bash
set -e

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install AWS CLI (already included in Amazon Linux 2023)
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Login to ECR
aws ecr get-login-password --region ${aws_region} | docker login --username AWS --password-stdin ${ecr_repository_uri}

# Create deployment script
cat > /home/ec2-user/deploy.sh << 'EOF'
#!/bin/bash
set -e

ECR_REPOSITORY="${ecr_repository_uri}"
AWS_REGION="${aws_region}"
CONTAINER_NAME="${app_name}"

echo "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY

echo "Pulling latest image..."
docker pull $ECR_REPOSITORY:latest

echo "Stopping existing container..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

echo "Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 80:80 \
  $ECR_REPOSITORY:latest

echo "Cleaning up old images..."
docker image prune -af

echo "Deployment complete!"
EOF

chmod +x /home/ec2-user/deploy.sh
chown ec2-user:ec2-user /home/ec2-user/deploy.sh

# Create initial deployment service
cat > /etc/systemd/system/${app_name}-deploy.service << EOF
[Unit]
Description=${app_name} Deployment Service
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
User=ec2-user
ExecStart=/home/ec2-user/deploy.sh
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl daemon-reload
sudo systemctl enable ${app_name}-deploy.service

echo "Setup complete!"
