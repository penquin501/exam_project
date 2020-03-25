# exam_project
1.create docker-compose.yml

version: "3.0"
services:
  webapp:
    build:
      context: webapp

2.run exam_project in terminal
> docker-compose up --build webapp
