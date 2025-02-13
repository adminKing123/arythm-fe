# Use the appropriate base image (Node.js if React app)
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Pass build arguments from Cloud Build
ARG REACT_APP_API_URI
ARG REACT_APP_HIDE_INSPECTOR
ARG REACT_APP_HIDE_INSPECTOR_REDIRECT_URL

# Set environment variables for the build
ENV REACT_APP_API_URI=$REACT_APP_API_URI
ENV REACT_APP_HIDE_INSPECTOR=$REACT_APP_HIDE_INSPECTOR
ENV REACT_APP_HIDE_INSPECTOR_REDIRECT_URL=$REACT_APP_HIDE_INSPECTOR_REDIRECT_URL

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:stable-alpine AS production

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
