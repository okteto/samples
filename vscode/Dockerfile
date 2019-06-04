# Using official python runtime base image
FROM python:stretch as app

# Install the application
WORKDIR /src
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . /src
EXPOSE 8080
CMD ["python", "app.py"]

FROM app

# Configure SSH server
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN mkdir /root/.ssh
EXPOSE 22

