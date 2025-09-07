# --- Build stage ---
FROM node:18 as build

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json + package-lock.json
COPY package*.json ./

# Cài dependencies (bỏ qua peer deps conflict nếu có)
RUN npm install --legacy-peer-deps

# Copy toàn bộ source code vào container
COPY . .

# Build app (ra thư mục /app/build)
RUN npm run build

# --- Serve stage ---
FROM nginx:alpine

# Copy build đã compile sang nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình nginx custom nếu có
# (ví dụ để proxy Laravel API)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
