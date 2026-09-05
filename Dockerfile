FROM node:18-alpine

# Install git so we can grab the files
RUN apk add --no-cache git

WORKDIR /app

# Clone the official EaglerProxy repo
RUN git clone https://github.com .

# Install dependencies and typescript globally
RUN npm install -g typescript
RUN npm install

# Compile the TypeScript files into JavaScript
RUN tsc

EXPOSE 10000

# Use a shell script launch format to swap the config dynamically at startup
CMD ["sh", "-c", "sed -i \"s/port: .*/port: 10000/\" ./stable_configs/proxy.yml && sed -i \"s/host: .*/host: '$REMOTE_HOST'/\" ./stable_configs/proxy.yml && sed -i \"s/port: .*/port: $REMOTE_PORT/\" ./stable_configs/proxy.yml && node src/index.js"]
