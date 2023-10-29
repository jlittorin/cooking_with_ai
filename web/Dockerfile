FROM node:current-alpine AS build

WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build


# Build runtime image
FROM nginx:latest AS deploy

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
