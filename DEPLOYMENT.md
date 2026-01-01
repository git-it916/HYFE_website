# HYFE Website 배포 가이드

이 가이드는 Docker, Terraform, GitHub Actions를 사용하여 AWS에 웹사이트를 배포하는 전체 과정을 설명합니다.

## 목차
1. [사전 준비](#사전-준비)
2. [환경 설정](#환경-설정)
3. [Terraform 인프라 구축](#terraform-인프라-구축)
4. [GitHub Actions 설정](#github-actions-설정)
5. [배포 프로세스](#배포-프로세스)
6. [문제 해결](#문제-해결)

---

## 사전 준비

### 필요한 도구
- [AWS CLI](https://aws.amazon.com/cli/)
- [Terraform](https://www.terraform.io/downloads) (>= 1.0)
- [Docker](https://www.docker.com/get-started)
- Git
- SSH 클라이언트

### AWS 계정 요구사항
- AWS 계정
- IAM 사용자 권한
- EC2 Key Pair

---

## 환경 설정

### 1. 환경 변수 파일 생성

[.env.example](.env.example) 파일을 복사하여 `.env` 파일을 생성하고 값을 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```bash
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_ACCOUNT_ID=your-aws-account-id
ECR_REPOSITORY_NAME=hyfe-website
EC2_INSTANCE_TYPE=t3.small
EC2_KEY_PAIR_NAME=hyfe-website-key
EC2_INSTANCE_NAME=hyfe-website-server
APP_NAME=hyfe-website
ENVIRONMENT=production
```

### 2. AWS CLI 설정

```bash
aws configure
```

위에서 설정한 Access Key와 Region을 입력하세요.

### 3. EC2 Key Pair 생성

AWS 콘솔에서 Key Pair를 생성하거나 CLI로 생성:

```bash
aws ec2 create-key-pair \
  --key-name hyfe-website-key \
  --query 'KeyMaterial' \
  --output text > hyfe-website-key.pem

chmod 400 hyfe-website-key.pem
```

---

## Terraform 인프라 구축

### 1. Terraform 변수 파일 생성

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

`terraform.tfvars` 파일을 편집하여 값을 설정:

```hcl
aws_region          = "ap-northeast-2"
app_name            = "hyfe-website"
environment         = "production"
ecr_repository_name = "hyfe-website"
ec2_instance_type   = "t3.small"
ec2_key_pair_name   = "hyfe-website-key"
ec2_instance_name   = "hyfe-website-server"
```

### 2. Terraform 초기화

```bash
terraform init
```

### 3. 실행 계획 확인

```bash
terraform plan
```

생성될 리소스를 확인하세요:
- VPC 및 네트워킹 (Subnet, Internet Gateway, Route Table)
- Security Group (포트 22, 80, 443 오픈)
- ECR Repository
- IAM Role 및 Instance Profile
- EC2 Instance (Amazon Linux 2023)
- Elastic IP

### 4. 인프라 배포

```bash
terraform apply
```

`yes`를 입력하여 확인합니다.

### 5. 출력 값 확인

배포 완료 후 중요한 정보가 출력됩니다:

```bash
terraform output
```

출력 예시:
```
ecr_repository_url = "123456789012.dkr.ecr.ap-northeast-2.amazonaws.com/hyfe-website"
ec2_public_ip = "52.79.123.456"
ec2_instance_id = "i-0123456789abcdef0"
website_url = "http://52.79.123.456"
```

이 값들을 저장해두세요!

---

## IAM 사용자 및 권한 설정

### 1. GitHub Actions용 IAM 사용자 생성

[iam-policies/README.md](iam-policies/README.md) 파일을 참고하여:

1. AWS Console → IAM → Users → Create user
2. User name: `github-actions-deployer`
3. Programmatic access 선택
4. [iam-policies/github-actions-policy.json](iam-policies/github-actions-policy.json)의 내용으로 정책 생성
5. Access Key 생성 및 저장

---

## GitHub Actions 설정

### 1. Repository Secrets 설정

GitHub Repository → Settings → Secrets and variables → Actions

다음 secrets를 추가:

| Secret 이름 | 값 | 설명 |
|-------------|-----|------|
| `AWS_ACCESS_KEY_ID` | AKIA... | GitHub Actions 사용자의 Access Key |
| `AWS_SECRET_ACCESS_KEY` | xxxxx... | GitHub Actions 사용자의 Secret Key |
| `AWS_REGION` | ap-northeast-2 | AWS 리전 |
| `ECR_REPOSITORY_NAME` | hyfe-website | ECR 저장소 이름 |
| `EC2_HOST` | 52.79.123.456 | EC2 Public IP (Terraform output) |
| `EC2_SSH_PRIVATE_KEY` | -----BEGIN RSA... | SSH 프라이빗 키 전체 내용 |

### 2. SSH 프라이빗 키 등록

`hyfe-website-key.pem` 파일의 전체 내용을 `EC2_SSH_PRIVATE_KEY` secret으로 등록:

```bash
cat hyfe-website-key.pem
```

출력된 내용 전체를 복사하여 GitHub Secret에 추가하세요.

---

## 배포 프로세스

### 자동 배포 (추천)

`main` 브랜치에 push하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Actions가 자동으로:
1. Docker 이미지 빌드
2. ECR에 이미지 푸시
3. EC2에서 새 이미지 pull 및 배포

### 수동 배포

GitHub Repository → Actions → Deploy to AWS → Run workflow

---

## 배포 확인

### 1. 웹사이트 접속

브라우저에서 EC2 Public IP로 접속:

```
http://52.79.123.456
```

### 2. EC2 인스턴스 접속

```bash
ssh -i hyfe-website-key.pem ec2-user@52.79.123.456
```

### 3. Docker 컨테이너 상태 확인

```bash
# EC2 인스턴스 내에서
docker ps
docker logs hyfe-website
```

### 4. 수동 재배포 (EC2 내에서)

```bash
/home/ec2-user/deploy.sh
```

---

## 로컬에서 Docker 테스트

배포 전 로컬에서 Docker 이미지를 테스트할 수 있습니다:

```bash
# 이미지 빌드
docker build -t hyfe-website:test .

# 컨테이너 실행
docker run -d -p 8080:80 hyfe-website:test

# 브라우저에서 http://localhost:8080 접속

# 컨테이너 중지
docker stop $(docker ps -q --filter ancestor=hyfe-website:test)
```

---

## 문제 해결

### GitHub Actions 실패

1. GitHub Actions 로그 확인
2. AWS Secrets 값이 올바른지 확인
3. IAM 권한 확인

### EC2 접속 불가

```bash
# Security Group 확인
aws ec2 describe-security-groups --group-ids sg-xxxxx

# 인스턴스 상태 확인
aws ec2 describe-instances --instance-ids i-xxxxx
```

### Docker 컨테이너 실행 안 됨

EC2에 SSH 접속 후:

```bash
# 로그 확인
docker logs hyfe-website

# ECR 재로그인
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.ap-northeast-2.amazonaws.com

# 수동 배포 재시도
/home/ec2-user/deploy.sh
```

### 웹사이트가 로드되지 않음

1. Security Group에서 포트 80이 열려있는지 확인
2. nginx 로그 확인:
   ```bash
   docker exec hyfe-website cat /var/log/nginx/error.log
   ```

---

## 리소스 정리

더 이상 사용하지 않는 경우 리소스를 삭제하세요:

```bash
cd terraform
terraform destroy
```

**주의**: 모든 AWS 리소스가 삭제됩니다!

---

## 추가 설정

### 도메인 연결

1. Route 53에서 도메인 구매 또는 기존 도메인 설정
2. A 레코드 추가: EC2 Elastic IP 지정
3. (선택) SSL 인증서 설정 (Let's Encrypt 또는 AWS Certificate Manager)

### HTTPS 설정

1. SSL 인증서 발급 (Let's Encrypt)
2. nginx 설정 업데이트
3. Security Group에 443 포트 확인

### 모니터링

- CloudWatch Logs 설정
- CloudWatch Alarms 설정 (CPU, 메모리, 디스크 사용량)
- 헬스 체크 설정

---

## 아키텍처 다이어그램

```
GitHub (push to main)
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
AWS ECR (이미지 저장)
    ↓
AWS EC2 (이미지 pull & 배포)
    ↓
웹사이트 서비스 (포트 80)
```

---

## 지원

문제가 발생하면:
1. GitHub Actions 로그 확인
2. EC2 인스턴스 로그 확인
3. AWS CloudWatch 로그 확인
4. [문제 해결](#문제-해결) 섹션 참고
