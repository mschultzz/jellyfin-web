
# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:alpine

# Copy the built application to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose ports for alternate access
EXPOSE 8097
EXPOSE 8921

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
