FROM php:8.1-fpm

# Cài extension cần thiết cho Laravel
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Tạo thư mục làm việc
WORKDIR /var/www

# Copy source code
COPY . .

# Cấp quyền storage & bootstrap cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
