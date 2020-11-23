#!/bin/bash

echo Limpiando assets..
rake assets:clean RAILS_ENV=production

echo Precompilando assets..
rake assets:precompile RAILS_ENV=production

echo Reiniciando servidor..
service apache2 reload