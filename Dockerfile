FROM node:16-alpine AS build
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "run", "build"]

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

