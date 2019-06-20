#!/bin/sh

# wait for PSQL server to start
while ! curl http://db:5432/ 2>&1 | grep '52'
do
    echo "Waiting for database..."
    sleep 1
done

cd myproject

# prepare init migration
python manage.py makemigrations myproject
# migrate db, so we have the latest db schema
python manage.py migrate
# start development server on public ip interface, on port 8080
python manage.py runserver 0.0.0.0:8080
