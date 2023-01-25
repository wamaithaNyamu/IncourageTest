# Linode Provider definition
terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.27.1"
    }
  }
}

# Configure the Linode provider
provider "linode" {
  token = var.linode-token
}
# Create a Linode instance
resource "linode_instance" "example" {
  image      = "linode/ubuntu20.04"
  type       = "g6-nanode-1"
  region     = "us-east"
  label      = "Incourage-test"
  private_ip = true
  root_pass  = var.root_pass
}
output "ip_address" {
  value = linode_instance.example.ip_address
}