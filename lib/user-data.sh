#!/bin/bash -xe

apt-get update && apt-get upgrade -y

apt-get install -y locales
locale-gen en_US.UTF-8
update-locale LANG=en_US.UTF-8
cat << EOF >> /etc/environment
LC_ALL=en_US.UTF-8
LANG=en_US.UTF-8
EOF

apt-get install -y mosh neofetch python-pip
