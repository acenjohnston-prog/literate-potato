FROM node:18-alpine

WORKDIR /app

# Install EaglerProxy via npm npm package
RUN npm install -g eaglerproxy

COPY config.yml /app/config.yml

EXPOSE 10000

CMD ["eaglerproxy", "--config", "/app/config.yml"]
