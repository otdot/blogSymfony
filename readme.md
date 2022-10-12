# Blog app symfony

- use docker to test website.
- create databases with docker-compose up --build
- rename symfonyBlog-folder to web

  - ``` shell cd web```
  - ```npm install```
  - ```composer require```
  - ```npm run watch```
  - create tables with ```./bin/console make:migration``` and ```./bin/console doctrine:migrations:migrate``` in docker container

## Technologies

[Symfony](https://symfony.com/)<br>
[React](https://reactjs.org/)<br>
[Bootstrap](https://getbootstrap.com/)
