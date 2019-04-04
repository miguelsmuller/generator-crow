#!/bin/sh

php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer

composer create-project --prefer-dist laravel/laravel app