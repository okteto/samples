FROM codercom/ubuntu-dev:latest as sail

# Using official python runtime base image
FROM codercom/code-server as dev

# copy vscode extension installer
COPY --from=sail /usr/bin/installext /usr/bin/installext

# install vscode extensions
RUN installext vscodevim.vim
RUN installext ms-python.python

# install python 3.7
RUN sudo apt-get -y update && sudo apt-get -y install python3.7 python3-pip
RUN sudo ln /usr/bin/python3 /usr/bin/python  
RUN sudo ln /usr/bin/pip3 /usr/bin/pip  

# install pip requirements
ADD --chown=coder:coder requirements.txt requirements.txt
RUN pip install -r requirements.txt

#################################################################################

# Using official python runtime base image
FROM python:3-slim

# Set the application directory
WORKDIR /src

RUN pip install --upgrade pip

# Install our requirements.txt
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy our code from the current folder to /app inside the container
ADD . /src

# Make port 8080 available for links and/or publish
EXPOSE 8080

# Define our command to be run when launching the container
CMD ["python", "app.py"]
