# 使用官方的Node.js运行时作为父镜像
FROM node:lts-alpine

# 设置工作目录
WORKDIR /app

# 将package.json和pnpm-lock.yaml复制到容器中
COPY package*.json ./

# 安装依赖，并缓存依赖内容
RUN npm install --no-warnings

# 复制项目文件到工作目录
COPY . .

# 构建Vue应用
RUN npm run build

# 使用nginx镜像作为基础镜像来运行Vue应用
FROM nginx:stable-alpine

# 复制自定义的Nginx配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将构建好的Vue应用的静态文件复制到nginx容器中
COPY --from=0 /app/dist /usr/share/nginx/html

# 暴露端口80
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]