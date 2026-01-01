# IAM 정책 설정 가이드

AWS 콘솔에서 IAM 정책을 수동으로 설정하는 방법입니다.

## 1. GitHub Actions용 IAM 사용자 생성 및 정책 설정

### 사용자 생성
1. AWS Console → IAM → Users → Create user
2. User name: `github-actions-deployer`
3. Access type: Programmatic access 선택
4. Next

### 정책 추가
1. Attach policies directly 선택
2. Create policy 클릭
3. JSON 탭 선택
4. [github-actions-policy.json](github-actions-policy.json) 파일의 내용을 복사하여 붙여넣기
5. Policy name: `GitHubActionsDeployPolicy`
6. Create policy
7. 사용자 생성 화면으로 돌아가서 방금 만든 정책 선택
8. Create user

### Access Key 생성
1. 생성된 사용자 선택
2. Security credentials 탭
3. Create access key
4. Use case: Third-party service 선택
5. Access key와 Secret access key를 안전하게 저장

---

## 2. EC2 Instance Role 정책 (Terraform으로 자동 생성됨)

Terraform이 자동으로 생성하지만, 수동으로 설정하려면:

### IAM Role 생성
1. AWS Console → IAM → Roles → Create role
2. Trusted entity type: AWS service
3. Use case: EC2 선택
4. Next

### 정책 추가
1. Create policy 클릭
2. JSON 탭 선택
3. [ec2-ecr-access-policy.json](ec2-ecr-access-policy.json) 파일의 내용을 복사하여 붙여넣기
4. Policy name: `EC2ECRAccessPolicy`
5. Create policy
6. Role 생성 화면으로 돌아가서 방금 만든 정책 선택
7. Role name: `hyfe-website-ec2-role`
8. Create role

---

## 3. GitHub Secrets 설정

GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

다음 항목들을 추가하세요:

- `AWS_ACCESS_KEY_ID`: GitHub Actions 사용자의 Access Key ID
- `AWS_SECRET_ACCESS_KEY`: GitHub Actions 사용자의 Secret Access Key
- `AWS_REGION`: `ap-northeast-2` (또는 사용하는 리전)
- `ECR_REPOSITORY_NAME`: `hyfe-website`
- `EC2_HOST`: EC2 인스턴스의 Public IP (Terraform 배포 후 확인 가능)
- `EC2_SSH_PRIVATE_KEY`: EC2 인스턴스 접속용 SSH 프라이빗 키 (PEM 파일 내용 전체)

---

## 주의사항

1. **보안**: Access Key와 Private Key는 절대 Git에 커밋하지 마세요
2. **리전**: 모든 정책과 설정에서 동일한 AWS 리전을 사용하세요
3. **리소스 ARN**: 정책 파일에서 `hyfe-website`를 다른 이름으로 변경했다면 ARN도 수정하세요
4. **권한 최소화**: 필요한 최소한의 권한만 부여하는 것이 보안 모범 사례입니다
