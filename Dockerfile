# Stage 1: Build the Vite application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files first for optimal layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy full source code and build static assets
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy custom Nginx routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
