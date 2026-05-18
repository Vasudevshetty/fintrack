# Multi-stage Dockerfile: Frontend Build + Backend + Server All-in-One
# This creates a single container running Express server that serves both API and frontend

FROM node:18-alpine as frontend-builder

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./

RUN npm run build

# Backend + Frontend Server Stage
FROM node:18-alpine

ARG ENVIRONMENT=production
ENV NODE_ENV=$ENVIRONMENT \
    ENVIRONMENT=$ENVIRONMENT

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy backend source
COPY backend/src ./src

# Copy frontend build from builder
COPY --from=frontend-builder /frontend/dist ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start backend server (which serves frontend as static files)
CMD ["node", "src/server.js"]
