FROM golang:alpine as dev
RUN apk --update add --no-cache bash
WORKDIR /app
ADD . .
RUN go build

FROM alpine as prod
WORKDIR /app
COPY --from=dev /app/app /app/app
EXPOSE 8080
CMD ["./app"]