FROM node:20-alpine
WORKDIR /app

# Įdedam package.json ir skriptus
COPY package.json ./package.json
COPY scripts ./scripts

# Įrašom priklausomybes ir atsisiunčiam TogetherJS hub/server.js
RUN npm install && node scripts/fetch.js \
&& mv hub/server.cjs -p $PORT -l 0.0.0.0

EXPOSE 8080
# Koyeb paduos $PORT; shell-form CMD leis jam būti panaudotam
CMD node hub/server.cjs -p $PORT -l 0.0.0.0
