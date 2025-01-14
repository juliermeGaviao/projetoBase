# Projeto Base

O presente projeto é referência, ou base, para o desenvolvimento de novos sistemas no Ibama. Ele é divido em backend, desenvolvido em Java, e frontend, ambientado em Node.js e Angular Typescript.

Para exemplificar os diversos elementos e aspectos do desenvolvimento de software nessas plataformas, estãos dispostos dois CRUDs (Create, Read, Update e Delete): produto e setor. Sendo setor, o setor ou categoria do produto. Portanto, são funcionalidades para manutenção de cadastro de produtos e seus setores.

A relação entre as entidades é: todo produto pertence a um setor, mas nem todo setor possui produtos. Ou seja, uma relação 1xN entre prouto e setor.

O projeto Base distribui tais funcionalidades ao longo de 3 camadas: banco de dados, backend e frontend. E, assim como o software em si, este documento é estruturado de forma contextualizada nessa organização.

## 1. Pré-requisitos

O projeto Base, como uma aplicação corporativa, utiliza banco de dados relacional para armazenamento dos registros de setores e produtos.

Esta documentação não tem escopo a instalação da infraestrutura de software do projeto, qual seja: banco de dados H2, banco de dados Oracle, Java, Apache Maven, Node.js ou NPM.

A partir dessas ferramentas, o projeto pode ser construído e executado.

### 1.1 Banco de Dados

O banco de dados utilizado no projeto Base depende do perfil spring boot utilizado na execução do backend. Maiores detalhes a respeito de perfil de execução do backend serão apresentados nas seções seguintes deste documento.

Por ora, é suficiente informar que o projeto Base já contém configurações para uso do banco H2 (perfil local) e banco de dados Oracle (demais perfis). Quando utilizado o banco de dados Oracle, a versão recomendada de uso é 19.3.

### 1.2 Backend

O módulo backend do projeto Base está apoiado no framework Spring Boot, na versão 3.3.6, mais especificamente. No entanto, na construção do módulo é usado o Apache Maven como plataforma de gestão de dependências do Spring Boot e também quem coordena a execução de testes unitários assim como a própria construção do artefato final. Tudo isso, apoiado em Java, versão 21 ou superior.

### 1.3 Frontend

Já o módulo frontend se utiliza de Node.js e Angular para implementar as funcionalidades acima citadas, ou seja, os CRUDs de produtos e setores.

A versão 20.18 do Node.js é sugerida para ser instalada como base desse módulo. Já a versão 10.8 é a versão de referência para o gestor de pacotes NPM. A partir dessa infraestrutura, o módulo está pronto para sua construção.

## 2. Instalação

A construção dos módulos backend e frontend do projeto base podem ser efetivadas de forma paralela e completamente independente. Obviamente, o contrário ocorre na execução na qual o backend depende da existência e perfeitas condições de funcionamento do banco de dados. Assim como o frontend é totalmente dependente, quanto a seu funcionamento, do módulo backend ligado e funcional.

### 2.1 Backend

Com JDK 21 e Apache Maven disponíveis, ou com a utilizado de plugin compatível da IDE preferida, o seguinte comando deve ser executado para construção do backend, dentro da pasta de mesmo nome:

`mvn clean package -DskipTests`

Após a conclusão da construção, o arquivo base.jar está disponível na subpasta target. A cláusula `-DskipTests` evita a execução de testes unitários os quais podem ser avaliados com a supressão da mesma.

### 2.2 Frontend

Da mesma forma que no backend, o frontend pode ser construído através de execução da construção na linha de comando ou com uso de plugin de IDE de desenvolvimento. Atendo-se à linha de comandao, para construir esse módulo deve-se executar:

`npm install`

A construção executada faz a descarga de todas as bibliotecas das quais o frontend necessita. Inclusive o framework Angular Typescript da versão 15, ambiente no qual a identidade visual gov.br está apoiada. Não só a identidade, mas componentes angular gov.br são importadas e incorporadas ao módulo.

A [Padrão Digital do Governo](https://www.gov.br/ds/home) pode ser consultado para maiores detalhes a respeito da referida identidade visual padrão.

## 3. Implantação e Execução

A execução dos módulos backend e frontend do projeto Base pode ser efetuadas de forma autônoma (standalone) ou como parte de ferramentas de orquestração como Azure, Openshift ou AWS.

Cada qual dos módulos possui o diretório devops com arquivo Dockerfile referência para implantação em contexto de conteinerização.

A presente documentação se limita ao contexto de execução autônoma apenas.

### 3.1 Backend

No contexto de backend, a execução faz uso direto de um dos executáveis Java. Dentro da pasta backend, executar:

`java -jar target/base.jar`

O framework Spring Boot, base desse módulo, em sua construção importa servidor web e o embute no arquivo base.jar. Portanto, a execução do comando acima disponibiliza as funcionalidades REST do backend na porta 8080 do servidor que o inicia.

Uma rápida consulta à documentação do Spring Boot permite alteração da porta padrão de execução do backend. O que implica alterar arquivo de configuração no perfil de execução almejado.

### 3.2 Frontend

O frontend pode ser disparado de duas formas: como parte do servidor Node.js ou como pacote a ser disponibiliza em servidor web como Apache.

Ao executar `npm start`, esse módulo inicia o serviço e o disponibiliza na porta 80. Assim como no backend, a porta de execução pode ser alterada no arquivo package.json, especificamente no *script start*. Em ambiente, Linux tal execução exige permissionamento de super usuário para que o serviço possa ser hospedado na porta 80.

## 4. Características

Alguns pontos merecem destaque dentro das camadas do projeto Base, apresentados a seguir.

### 4.1 Banco de dados

Abaixo, é apresentado o diagrama de entidade-relacionamento utilizado no projeto.

![!](assets/er.png)


### 4.2 Backend

mvn verify

O módulo backend do projeto Base está apoiado no framework Spring Boot, na versão 3.3.6, mais especificamente. Com tal, este framework permite a utilização de vários perfis de execução, o que permite definir diferentes configurações conforme o ambiente de trabalho. Apesar de poder serem alterados ou estendidos, a presente conjuntura do projeto conta com os seguintes perfis de execução:

- Local - application.yml : frequentemente utilizado no cenário em que os bancos de dados Oracle não estão disponível. Tal perfil utiliza banco de dados H2;
- Dev: perfil utilizado na maior parte do tempo para desenvolvimento e testes das funcionalidades do módulo;
- Prod: contém as configurações adotadas em ambiente de produção;

Novamente, mais perfis podem ser adicionados como, por exemplo, homologação (hom)

## 5. Considerações Finais

Conclusão

![!](assets/indicador-qualidade-backend.png)

Frontend

![!](assets/indicador-qualidade-frontend.png)
