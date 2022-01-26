# API Projeto Mileto

Este repositório armazena o código referente a API (Back-End) o projeto em desenvolvimento Mileto. Caso tenha interesse em testar, siga os passos abaixo:

## Requisitos para funcionamento

<ul>
    <li>Node.js instalado</li>
    <li>Docker instalado</li>
</ul>

## Como rodar (manualmente)?

<ol>
    <li>Executar no terminal, o comando: <code>docker run --name mysql-serv -e MYSQL_ROOT_PASSWORD=mileto123 -p 3306:3306 -d mysql:5.7</code></li>
    <li>Verifique se o container aparece na tabela através do comando: <code>docker ps</code></li>
    <li>Caso apareça com o nome "mysql-serv", execute neste diretório: <code>npm install</code> </li>
    <li>Em seguida, rode os comandos (sequencialmente): <code>npx sequelize-cli db:create</code> | <code>npx sequelize-cli db:migrate</code></li>
    <li>Por fim, você pode usar <code>npm run dev</code> (recomendado) ou <code>npm start</code></li>
</ol>

## Tecnologias

<ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>Sequelize ORM</li>
    <li>Docker</li>
    <li>Docker-Compose</li>
</ul>

## Metodologias e Abordagens metodológicas

<ul>
    <li>Design Thinking</li>
    <li>Scrumban</li>
    <li>Git Flow</li>
    <li>Versionamento semântico (adaptado)</li>
</ul>
