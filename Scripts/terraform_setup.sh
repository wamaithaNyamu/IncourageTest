#!/bin/bash
# create the directory name of the ssh keys
# $HOME is a bash variable that points to the home directory of the current user
echo "-----------------------Creating ssh keys-----------------------"
mkdir -p $HOME/.ssh/incouragekeys

# create the ssh keys
ssh-keygen -t rsa -b 4096 -C "incourage test" -f $HOME/.ssh/incouragekeys/id_rsa -N "" <<< y

echo "------Adjust permissions of generated key-files locally---"
chmod 0600 "$HOME/.ssh/incouragekeys/id_rsa" "$HOME/.ssh/incouragekeys/id_rsa.pub"

# get to root directory
cd .. 

# get into the terraform directory
echo "-----------------------Starting Terraform Execution-----------------------"
cd terraform

# initialize terraform
terraform init

# plan terraform
echo "----------------------- Terraform Plan -----------------------"
terraform plan -lock=false

# apply terraform
echo "----------------------- Terraform Apply -----------------------"
terraform apply -auto-approve -lock=false

# save the ip address of the instance in variable ip
echo "----------------------- Terraform Output -----------------------"
ip=$(terraform output -json | jq -r '.ip_address.value')


# get back to root directory
cd ..

# get into the terraform directory
cd terraform

echo "----------------------- Copying public Key to Instance -----------------------"

# Read the terraform.tfvars file
while read -r line
do
  # Split the line into a key and a value
  key=$(echo "$line" | cut -d'=' -f1)
  value=$(echo "$line" | cut -d'=' -f2)
  # If the key is "password", store the value in a bash variable
  if [ "$key" == "root_pass" ]; then
    # Delete the quotes from the value
    password=$(echo "$value" | tr -d '"')
  fi
done < terraform.tfvars

# get back to root directory
cd ..

# save the ip to a file
echo "----------------------- Saving IP Addresses -----------------------"

# create a file to store the ip address
touch inventory.ini
echo $ip > inventory.ini

## the ssh pass needs to be installed on the machine
while read line; 
do 
    echo "----------------Copying ssh keys to server id -> $line----------------"; 
    sshpass -p $password ssh-copy-id -i $HOME/.ssh/incouragekeys/id_rsa.pub -o PubkeyAuthentication=yes -o PasswordAuthentication=yes -o StrictHostKeyChecking=no root@$line
done <  inventory.ini

echo "----------------------- All done now! -----------------------"
echo "Copy the following private key to the github repository secrets"
cat $HOME/.ssh/incouragekeys/id_rsa

exit

exec bash
