# DOCUMENTAÇÃO CHALLENGE - MOBILE

Este projeto é referente nossa solução para a empresa **Mottu**.


## Proposta do projeto: 

  O projeto MotoFindr surge para resolver um desafio crítico enfrentado pela Mottu: a dificuldade de gerenciar e localizar motos dentro dos pátios 
devido à imprecisão do GPS em espaços curtos e à falta de um sistema eficiente de registro. Atualmente, as entradas e saídas das motos são registradas 
de forma simplificada (apenas com dados como chassi, placa e data), o que gera desorganização, ineficiência operacional e até riscos de perdas.

Para este sprint, nós criamos uma aplicação que atualmente tem cinco telas, para o usuário poder adicionar e excluir os pátios. Mas, nas próximas sprints, 
haverá mais telas, onde ele poderá interagir até com os motoqueiros.


O sistema permite:
- Logar como admin
- Consultar Pátios existentes 
- Adicionar e excluir Pátios
- Vizualizar perfil do admin


## Nome Integrantes
<div align="center">

| Nome | RM |
| ------------- |:-------------:|
| Arthur Eduardo Luna Pulini|554848|
|Lucas Almeida Fernandes de Moraes| 557569     |
|Victor Nascimento Cosme|558856|

</div>


## 🚀 Começando

Para inicializar o projeto com expo, rodar o comando: 

```
  npx expo start
```

Ele ira inicializar na porta *http://localhost:8081*

A primeira tela que você irá ver será a tela de login, nela você encontrará algumas opções, algumas delas não estarão funcionando ainda, os campos são: esqueceu minha senha, entrar com google e entrar com github,
eles serão implementados em sprints posteriores, para ter o acesso as outras funcionalidades o login de acesso vai estar na tela mas vou colocar aqui também, se tentar acessar com outras vai gerar um erro, pois esse admin esta mokado e não tem outros, pós login entrará na tela do Admin, onde tem 3 opções de escolha:


```
  Login: admin
  Senha: admin
```


1- Consultar Pátios
Onde terá uma lista de pátios cadastrados ou não que em cada pátio terá um borão de excluir e também haverá um botão de inserir pátio, onde vai poder inserir novos pátios e eles seram armazenados em memória.

2- Meu Perfil
Onde terá informações sobre o admin como por exemplo o nome e a função.

3- Botão de sair.


## Link Figma: 
A navegação não está funcional pois não conseguimos implementar pela falta de tempo, mas o senhor disse que não ia cobrar.
https://www.figma.com/design/eCgS0WKfb2uH6ijMKgHO59/MotoFindr?node-id=13-3&t=kmdQQDYZvQpLoS5V-1

## Link Expo:

<img width="323" height="317" alt="image" src="https://github.com/user-attachments/assets/eb6819b4-1143-474a-a70f-ae1d0e9c1b25" />


 https://expo.dev/preview/update?message=Atualiza%C3%A7%C3%A3o+OTA&updateRuntimeVersion=1.0.0&createdAt=2025-09-24T00%3A52%3A44.818Z&slug=exp&projectId=014ca88d-3f94-4137-9c23-a3d0396c7cab&group=260753db-0e79-4494-8e26-e9c83f3b2f00


exp+://expo-development-client/?url=https://u.expo.dev/014ca88d-3f94-4137-9c23-a3d0396c7cab/group/260753db-0e79-4494-8e26-e9c83f3b2f00
