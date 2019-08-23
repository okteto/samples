FROM golang:alpine as builder
RUN apk --update add --no-cache bash
WORKDIR /app
ADD . .
RUN go build

FROM alpine as prod
WORKDIR /app
COPY --from=builder /app/app /app/app
EXPOSE 8080
CMD ["./app"]