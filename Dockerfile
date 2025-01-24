# Etapa 1: Build da aplicação
FROM node:22 AS build

# Definir o diretório de trabalho para o build
WORKDIR /app

# Copiar somente os arquivos de configuração do pacote para otimizar a camada Docker
COPY package*.json ./

# Atualiza o npm para uma versão estável
RUN npm install -g npm@11.0.0

# Instalar as dependências
RUN npm install --force

# Copiar todo o código fonte
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Etapa 2: Servir o build com servidor Apache (em vez do Nginx)
FROM httpd:2.4

# Remover a configuração padrão do HTTPD para ajustar ao build React
RUN rm -rf /usr/local/apache2/htdocs/*

# Copiar os arquivos construídos pelo build para o diretório padrão do Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

#COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Expor porta 80 para servir o site estático
EXPOSE 8087

# Comando para inicializar o Apache
CMD ["httpd-foreground"]