# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Handle environment variables
# Copy .env if exists, otherwise copy .env.example as .env
RUN if [ -f .env ]; then \
        echo "Using existing .env file"; \
    elif [ -f .env.example ]; then \
        echo "Copying .env.example to .env"; \
        cp .env.example .env; \
    else \
        echo "No environment file found, creating empty .env"; \
        touch .env; \
    fi

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]