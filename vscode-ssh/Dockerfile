# Using official golang runtime base image
FROM python:stretch

# Configure SSH server
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
EXPOSE 22

# Install the application
WORKDIR /usr/src/app
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . /usr/src/app
EXPOSE 8080
CMD ["python", "app.py"]
