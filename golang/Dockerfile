FROM golang:alpine

RUN apk --update add --no-cache bash

WORKDIR /app
ADD . .
RUN go build

EXPOSE 8080

CMD ["./app"]