#!/bin/bash

rake db:drop RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1
rake db:create RAILS_ENV=production
rake db:migrate RAILS_ENV=production
sudo rake db:seed RAILS_ENV=production