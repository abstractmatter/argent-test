# 1. Builder Image
FROM node:lts-alpine as build

ENV APP_NAME app
ENV PATH /var/www/node_modules/.bin:$PATH

# Avoid inline JavaScript for Content Security Policy (CSP)
# https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
ENV INLINE_RUNTIME_CHUNK false

WORKDIR /var/www

COPY .eslintrc.js ./
COPY .prettierrc.js ./
COPY package-lock.json ./
COPY package.json ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

RUN npm ci --omit=dev

# copy source code AFTER npm ci to maximize the cache
COPY public ./public
COPY src ./src

RUN npm run build

RUN sed -i -e "s/__BUILD_DATE__/$(date -u +"%Y-%m-%dT%H:%M:%SZ")/g" ./build/index.html

# 2. Production Image
FROM nginx:alpine

# clean nginx default folder
RUN rm -f /usr/share/nginx/html/*

COPY --from=build /var/www/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
