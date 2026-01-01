variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-2"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "hyfe-website"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "hyfe-website"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "ec2_key_pair_name" {
  description = "EC2 key pair name"
  type        = string
}

variable "ec2_instance_name" {
  description = "EC2 instance name"
  type        = string
  default     = "hyfe-website-server"
}
