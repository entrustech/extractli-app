# Use the official Node.js image as the base image
FROM node:16.15.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set the API URL environment variable (default value, can be overridden when running the container)
ARG REACT_APP_API_URL=http://localhost:3000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build the ReactJS application
RUN npm run build

# Install a lightweight web server to serve the ReactJS app
RUN npm install -g serve

# Expose the port the web server will run on
EXPOSE 4000

# Start the web server to serve the built ReactJS application
CMD ["serve", "-s", "build", "-l", "4000"]
