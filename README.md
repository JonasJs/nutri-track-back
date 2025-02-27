# NutriTrack

NutriTrack é seu companheiro ideal para uma alimentação saudável! Com nosso aplicativo, você pode rastrear sua nutrição e refeições de forma fácil e eficaz, ajudando você a alcançar suas metas de dieta e bem-estar.

### Regras da aplicação

- [x] Deve ser possível criar um usuário
  - [x] Deve ser cadastrado a senha de forma criptografada
- [x] Deve ser possivel iniciar uma sessão
  - [x] Deve ser possivel ter acesso token e refresh toke
- [ ] Deve ser possivel atualizar o token utilizando o refresh token
- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] Deve ser possivel acessar rota internar apenas com o token valido.
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  > *As refeições devem ser relacionadas a um usuário.*
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---