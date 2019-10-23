# Using official python runtime base image
FROM python:stretch

# Install the application
WORKDIR /src
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . /src
EXPOSE 8080
CMD ["python", "app.py"]
