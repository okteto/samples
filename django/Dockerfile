# use base python image with python 2.7
FROM python:2.7

# install okteto cli in the dev image
RUN curl https://get.okteto.com -sSfL | sh

# install kubectl cli in the dev image
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl

ENV PYTHONUNBUFFERED true 

# set working directory to /app/
WORKDIR /app/

# copy requirements.txt to the image
COPY requirements.txt requirements.txt

# install python dependencies
RUN pip install -r requirements.txt

# copy code base to the image
COPY . .

CMD ["./run_web.sh"]