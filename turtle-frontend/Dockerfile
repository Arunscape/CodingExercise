# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app 
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . ./
# RUN yarn build

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# let's just do a sloppy developer version for now
FROM node:lts-alpine
WORKDIR /app 
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3000
CMD yarn start