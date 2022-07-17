FROM nginx:1.21.6

COPY --chown=nginx:nginx dist /usr/share/nginx/html/release/admin
COPY default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html/release
