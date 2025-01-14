# Projeto Base

O presente projeto é referência, ou base, para o desenvolvimento de novos sistemas no Ibama. Ele é divido em backend, desenvolvido em Java, e frontend, ambientado em Node.js e Angular Typescript.

Para exemplificar os diversos elementos e aspectos do desenvolvimento de software nessas plataformas, estãos dispostos dois CRUDs (Create, Read, Update e Delete): produto e setor. Sendo setor, o setor ou categoria do produto. Portanto, são funcionalidades para manutenção de cadastro de produtos e seus setores.

A relação entre as entidades é: todo produto pertence a um setor, mas nem todo setor possui produtos. Ou seja, uma relação 1xN entre prouto e setor.

## 1. Pré-requisitos

O projeto Base, como uma aplicação corporativa, utiliza banco de dados relacional para armazenamento dos registros de setores e produtos.

Esta documentação não tem escopo a instalação da infraestrutura de software do projeto, qual seja: banco de dados H2, banco de dados Oracle, Java, Apache Maven, Node.js ou NPM.

A partir dessas ferramentas, o projeto pode ser construído e executado.

### 1.1 Banco de Dados

O banco de dados utilizado no projeto Base depende do perfil spring boot utilizado na execução do backend. Maiores detalhes a respeito de perfil de execução do backend serão apresentados nas seções seguintes deste documento.

Por ora, é suficiente informar que o projeto Base já contém configurações para uso do banco H2 (perfil local) e banco de dados Oracle (demais perfis). Quando utilizado o banco de dados Oracle, a versão recomendada de uso é 19.3.

### 1.2 Backend

O módulo backend do projeto Base está apoiado no framework Spring Boot, na versão 3.3.6, mais especificamente. No entanto, na construção do módulo é usado o Apache Maven como plataforma de gestão de dependências do Spring Boot e também quem coordena a execução de testes unitários assim como a própria construção do artefato final.

### 1.3 Frontend

Já o módulo frontend se utiliza de Node.js e Angular para implementar as funcionalidades acima citadas, ou seja, os CRUDs de produtos e setores.

A versão 20.18 do Node.js é sugerida para ser instalada como base desse módulo. Já a versão 10.8 é a versão de referência para o gestor de pacotes NPM. A partir dessa infraestrutura, o módulo está pronto para sua construção.

## 2. Instalação

A construção dos módulos backend e frontend do projeto base podem ser efetivadas de forma paralela e completamente independente. Obviamente, o contrário ocorre na execução na qual o backend depende da existência e perfeitas condições de funcionamento do banco de dados. Assim como o frontend é totalmente dependente, quanto a seu funcionamento, do módulo backend ligado e funcional.

### 2.1 Backend

 
### 2.2 Frontend

## 3. Características

Alguns pontos merecem destacam dentro das camadas do projeto Base, apresentados a seguir.

### 3.1 Banco de dados


Abaixo, é apresentado o diagrama de entidade-relacionamento utilizado no projeto.

![!](assets/er.png)


### 3.2 Backend

O módulo backend do projeto Base está apoiado no framework Spring Boot, na versão 3.3.6, mais especificamente. Com tal, este framework permite a utilização de vários perfis de execução, o que permite definir diferentes configurações conforme o ambiente de trabalho. Apesar de poder serem alterados ou estendidos, a presente conjuntura do projeto conta com os seguintes perfis de execução:

- Local - application.yml : frequentemente utilizado no cenário em que os bancos de dados Oracle não estão disponível. Tal perfil utiliza banco de dados H2;
- Dev: perfil utilizado na maior parte do tempo para desenvolvimento e testes das funcionalidades do módulo;
- Prod: contém as configurações adotadas em ambiente de produção;

Novamente, mais perfis podem ser adicionados como, por exemplo, homologação (hom)

## 4. Considerações Finais

Conclusão

![!](assets/indicador-qualidade-backend.png)

Frontend

![!](assets/indicador-qualidade-frontend.png)
