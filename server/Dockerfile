# Step 1 — Use an official Node.js image
FROM node:18-alpine

# Step 2 — Set working directory inside container
WORKDIR /app

# Step 3 — Copy package.json and package-lock.json if available
COPY package*.json ./

# Step 4 — Install dependencies
RUN npm install --production

# Step 5 — Copy all project files
COPY . .

# Step 6 — Expose the port (Back4App or container will map it automatically)
EXPOSE 3000

# Step 7 — Set environment variable for Node environment
ENV NODE_ENV=production

# Step 8 — Command to start the server
CMD ["npm", "start"]
