FROM node:18-alpine

WORKDIR /app

# Install EaglerProxy globally
RUN npm install -g eaglerproxy

# Expose Render's required web port
EXPOSE 10000

# Run the proxy using environment variables passed from Render
CMD ["sh", "-c", "eaglerproxy --host 0.0.0.0 --port 10000 --remote-host $REMOTE_HOST --remote-port $REMOTE_PORT"]
