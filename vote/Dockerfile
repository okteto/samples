# Using official python runtime base image
FROM python:3-alpine

# Set the application directory
WORKDIR /usr/src/app

# Install our requirements.txt
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy our code from the current folder to /app inside the container
ADD . /usr/src/app

# Make port 8080 available for links and/or publish
EXPOSE 8080

# Define our command to be run when launching the container
CMD ["python", "app.py"]
