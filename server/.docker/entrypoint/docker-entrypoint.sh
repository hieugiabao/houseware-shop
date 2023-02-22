#!/bin/bash

set -e

echo "*****"
echo "** Application preparing to start up... Hi!"
echo "** Local time         :$(date -Is)"
echo "** Container hostname :$(hostname)"
echo "** Container timezone :$(cat /etc/timezone)"
echo "** Container PHP timezone :$(php -r "echo ini_get('date.timezone');")"
echo "** Container user     :$(id)"
echo "**"

while ! nc -z mysql-db 3306; do
  echo "Waiting for MySQL to start..."
  sleep 3
done
if [ -d "/var/www" ];
then
  pushd /var/www

  if [ "$COMPOSER_INSTALL" = "ENABLE" ]
  then
    echo "  Running composer install - diasble with .env entry COMPOSER_INSTALL=DISABLE"
    composer install
  else
    echo "  Skipping composer install - enable with .env entry COMPOSER_INSTALL=ENABLE"
  fi

  if [ "$NPM_INSTALL" = "ENABLE" ]
  then
    echo "  Running npm install - diasble with .env entry NPM_INSTALL=DISABLE"
    npm install
  else
    echo "  Skipping npm install - enable with .env entry NPM_INSTALL=ENABLE"
  fi

  if [ "$DB_MIGRATE" = "ENABLE" ]
  then
    echo "  Running php artisan migrate - diasble with .env entry DB_MIGRATE=DISABLE"
    php artisan migrate
  else
    echo "  Skipping php artisan migrate - enable with .env entry DB_MIGRATE=ENABLE"
  fi

  if [ "$DB_SEED" = "ENABLE" ]
  then
    echo "  Running php artisan db:seed - diasble with .env entry DB_SEED=DISABLE"
    php artisan db:seed
  else
    echo "  Skipping php artisan db:seed - enable with .env entry DB_SEED=ENABLE"
  fi

  if [ "$SERVE_LARAVEL" = "ENABLE" ]
  then
    echo "  Running php artisan serve - diasble with .env entry SERVE_LARAVEL=DISABLE"
    php artisan serve --host=0.0.0.0
  else
    echo "  Skipping php artisan serve - enable with .env entry SERVE_LARAVEL=ENABLE"
  fi

  popd
fi
