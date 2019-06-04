FROM ruby:2
WORKDIR /src
RUN apt-get update && \
    apt-get install sqlite3

COPY . .

RUN bundler install
RUN rails db:migrate
EXPOSE 3000

CMD ["sh", "-c", "rails db:migrate && rails server"]