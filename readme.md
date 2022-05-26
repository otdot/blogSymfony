# Blog app symfony

    - use docker to test website.
    - create databases with docker-compose up --build
    - rename symfonyBlog-folder to web
        - ```cd web```
        - ```npm install```
        - ```composer require```
        - ```npm run watch```
    - create tables with ```./bin/console make:migration``` and ```./bin/console doctrine:migrations:migrate``` in docker container

## Techonologies

[Symfony](https://symfony.com/)
[React](https://reactjs.org/)
[Bootstrap](https://getbootstrap.com/)