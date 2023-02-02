FROM jsdecena/php8-fpm

ENV NODE_VERSION=16.13.0

RUN docker-php-ext-install mysqli pdo_mysql gd

COPY shop-api ./

COPY shop-api/.env.example ./.env

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY ./.docker/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN apt-get update && apt-get install -y netcat

ENV COMPOSER_INSTALL=ENABLE
ENV NPM_INSTALL=ENABLE
ENV DB_MIGRATE=ENABLE
ENV DB_SEED=ENABLE
ENV SERVE_LARAVEL=ENABLE
