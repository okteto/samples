FROM ruby:2.6.2
WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install sqlite3

COPY Gemfile* .
RUN bundler install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "rails db:migrate && rails server -p=8080 -b=0.0.0.0"]