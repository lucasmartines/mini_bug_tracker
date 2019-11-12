heroku buildpacks:set https://github.com/heroku/heroku-buildpack-php.git
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nodejs.git

heroku config:set NPM_CONFIG_PRODUCTION=false

web: vendor/bin/heroku-php-apache2 public/
