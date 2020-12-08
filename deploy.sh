#!/bin/bash

rake assets:clean RAILS_ENV=production
rake assets:precompile RAILS_ENV=production
sudo service apache2 reload