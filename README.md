# Google Sheets Integration

#### A simple interaction with Google Sheets API.

#### Runtime environment
###### Node [v13.11.0]

#### Node package manager
###### NPM [v6.13.7]

#### Dependências
###### google-spreadsheet [v3.0.10]

#### Configuração
Para a utilização será necessário fornecer as credenciais da API e alterar o valor da variável **'sheetId'** no arquivo index.js.

As credenciais da API necessária podem ser obtidas acessando o Google Cloud Platform atráves do link: https://console.developers.google.com/apis/, executando os seguintes passos:

1. Criar um projeto ou utilizar um existente, buscar e ativar a API **Google Sheets API**.
2. Em Credenciais, criar credenciais do tipo Conta de Serviço, conceder permissões de **Editor** no campo **Papel** e criar **Chave Privada** no formato JSON.
3. Renomear o arquivo com extensão JSON para **credentials.json** e inserir na pasta do projeto.
4. Compartilhar a planilha que será utilizada com o e-mail do campo **client_email** em credentials.json.

#### Run Project
###### npm install
###### npm start
