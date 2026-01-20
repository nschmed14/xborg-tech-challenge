FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application - NO CD COMMAND
CMD ["node", "dist/main"]
