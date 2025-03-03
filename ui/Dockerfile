FROM node

COPY libraryquest_ui /ui

WORKDIR /ui

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "dev"]