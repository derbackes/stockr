#!/bin/bash
echo 'Installing backend Server'
echo 'LC_ALL="en_US.UTF-8"' | sudo tee -a /etc/environment

# Copy the ssh key
cp /var/shared/id_rsa /home/vagrant/.ssh/id_rsa
chmod 600 /home/vagrant/.ssh/id_rsa
chown vagrant:vagrant /home/vagrant/.ssh/id_rsa

# Install Packages
sudo apt-get update
sudo apt-get -y install git-core
sudo apt-get -y install build-essential

# Install MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get -y install mongodb-org

# Install Redis - with defaults
cd
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
echo -n | sudo utils/install_server.sh

# Add the new repository for node
sudo apt-get install -y software-properties-common python-software-properties
apt-add-repository -y ppa:chris-lea/node.js
apt-get update
sudo apt-get install -y nodejs

# Create the log directory
mkdir -p /var/log/stockr/
chown vagrant:vagrant /var/log/stockr/