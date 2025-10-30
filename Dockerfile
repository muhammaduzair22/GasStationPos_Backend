# ---- Base image ----
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of your application code
COPY . .

# Set environment variable for production
ENV NODE_ENV=production

# Your Express app should use process.env.PORT or default to 5000
ENV PORT=5000

# Expose the port that your app listens on
EXPOSE 5000

# Start the server
CMD ["node", "dist/server.js"]
