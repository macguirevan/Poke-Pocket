#!/bin/bash

mkdir -p secrets
echo "dfranco1" > secrets/db_username.txt
echo "dfrancoms1234" > secrets/db_password.txt

# Generate SSH key
ssh-keygen -t rsa -b 4096 -f secrets/ssh_key -N ""

echo "Secret files created. Send your public key (secrets/ssh_key.pub) to a server admin to add to authorized_keys"
echo "Display public key using the command:"
echo "cat secrets/ssh_key.pub"

echo "DB_USERNAME=dfranco1" > .env
echo "DB_PASSWORD=dfrancoms1234" >> .env
