# Componente Endereço para Dynamics 365
Componente de PowerApps Framework de Endereço para Dynamics 365, que utiliza a api do [ViaCep](http://www.viacep.com.br) para obter os dados de endereço.

O utilizando o controle é possível obter 4 valores de saida:
  - Logradouro: Representa o endereço
  - Cidade: Representa a cidade localizada a partir do CEP
  - Estado: Representa a unidade federativa localizada a partir do CEP
  - Bairo: Representa o Bairro localzado a aprtir do CEP
  - CEP: Cep digitado na pesquisa
  - Complemento: Campo para preenchimento de dados adicionais

# Instalação

Para a instalação, basta baixar o projeto e rodar o seguinte comando na pasta deployment:

```sh 
msbuild
```
Será gerado o pacote com zip para importação. Importar no Dyanmics 365.

# Configuração

Para configurar o controle, você deverá abrir o formulário que deseja adicionar  e selecionar o campo, do tipo texto, e ir até a aba "Controle".

Localizar pelo control "Cep Controle". Faça o mapeamento para os campos de saida. Após isso clique em salva e depois publicar.

