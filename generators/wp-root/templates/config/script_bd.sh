#!/bin/bash

gunzip < /var/config/database.sql.gz | mysql --user=admin --password=admin database
