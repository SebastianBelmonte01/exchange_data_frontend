FROM --platform node:18.17 as build

ARG environment
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration $environment


FROM nginx:1.17.0-alpine

#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/exchange_data_frontend /usr/share/nginx/html
