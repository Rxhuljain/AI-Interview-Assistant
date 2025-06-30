# Multi-stage build
FROM node:18-alpine AS builder

# Build backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

# Copy backend
COPY backend/ ./backend/
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Copy built frontend
COPY --from=builder /app/frontend/build ./backend/public

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "backend/server.js"]
