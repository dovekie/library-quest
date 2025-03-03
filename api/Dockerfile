FROM python:3.8-slim-buster

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY libraryquest_api /libraryquest_api
RUN apt-get update \
    && apt-get -y install libpq-dev gcc
RUN pip install -r "/libraryquest_api/requirements.txt"


WORKDIR /libraryquest_api

CMD python manage.py runserver 0.0.0.0:8888