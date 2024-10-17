# Weather App Angular

Este projeto é um aplicativo Angular que exibe informações meteorológicas atuais, previsão do tempo para as próximas horas e previsão diária. Ele utiliza a API do OpenWeatherMap para obter dados meteorológicos com base na localização pesquisada pelo usuário.

### Link do projeto
https://weather-wise-rho-blue.vercel.app/

## Funcionalidades

- Exibição de informações meteorológicas atuais (cidade, país, temperatura, sensação térmica, descrição do tempo, etc.)
- Previsão do tempo para as próximas horas
- Previsão do tempo para os próximos dias
- Atualização automática dos dados

## Tecnologias Utilizadas

- Angular
- TypeScript
- HTML
- CSS
- API OpenWeatherMap

## Componentes

### PesquisaComponent
Este componente permite ao usuário pesquisar a localização para a qual deseja obter informações meteorológicas. Ao inserir o nome de uma cidade, o componente chama os métodos do TempoService para buscar os dados necessários.

### TempoComponent
Este componente exibe as informações meteorológicas atuais, a previsão do tempo para as próximas horas e a previsão diária. Ele utiliza o serviço TempoService para obter os dados da API.

## Serviços

### TempoService
Este serviço é responsável por fazer chamadas à API do OpenWeatherMap para buscar dados meteorológicos baseados na localização pesquisada pelo usuário.

### Interfaces
As interfaces definem a estrutura dos dados recebidos da API.

## Instalação

Instale as dependências:

1. Instale as dependências:
npm install
Inicie o servidor de desenvolvimento:

2. Inicie o servidor de desenvolvimento:
ng serve

3. Abra seu navegador e acesse:
http://localhost:4200
