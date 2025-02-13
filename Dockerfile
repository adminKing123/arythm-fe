# Use Node.js for building the app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the files
COPY . .

# Inject environment variables at build time
ARG REACT_APP_API_URI
ARG REACT_APP_HIDE_INSPECTOR
ARG REACT_APP_HIDE_INSPECTOR_REDIRECT_URL

# Build the React app
RUN REACT_APP_API_URI=$REACT_APP_API_URI \
    REACT_APP_HIDE_INSPECTOR=$REACT_APP_HIDE_INSPECTOR \
    REACT_APP_HIDE_INSPECTOR_REDIRECT_URL=$REACT_APP_HIDE_INSPECTOR_REDIRECT_URL \
    npm run build

# Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
