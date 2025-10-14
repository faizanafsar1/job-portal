# Step 1 — Use official Node.js image
FROM node:18-alpine

# Step 2 — Set working directory
WORKDIR /app

# Step 3 — Copy only backend package.json files
COPY server/package*.json ./

# Step 4 — Install dependencies
RUN npm install --production

# Step 5 — Copy backend code
COPY server/. .

# Step 6 — Expose backend port
EXPOSE 5000

# Step 7 — Set environment
ENV NODE_ENV=production

# Step 8 — Start server
CMD ["npm", "start"]
