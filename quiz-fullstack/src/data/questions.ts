export type OptionsTypeFull = {
  id: number;
  response: string;
  isCorrect: boolean;
  questionId: number;
};

export type QuestionsTypeFull = {
  id: number;
  question: string;
  options: OptionsTypeFull[];
  correct: number; // índice da opção correta
};

export const questions: QuestionsTypeFull[] = [
  {
    id: 1,
    question: "Qual a principal diferença entre o Git e o GitHub?",
    options: [
      {
        id: 1,
        response:
          "O GitHub é um editor de texto e o Git é um sistema de versionamento",
        isCorrect: false,
        questionId: 1,
      },
      {
        id: 2,
        response:
          "O Git funciona localmente e o GitHub é uma plataforma de repositórios remotos",
        isCorrect: true,
        questionId: 1,
      },
      {
        id: 3,
        response: "O Git é pago e o GitHub é gratuito",
        isCorrect: false,
        questionId: 1,
      },
      {
        id: 4,
        response: "Ambos são a mesma coisa",
        isCorrect: false,
        questionId: 1,
      },
    ],
    correct: 1, // índice no array
  },
  {
    id: 2,
    question:
      "Qual comando usamos para conectar um repositório local a um remoto no GitHub?",
    options: [
      { id: 5, response: "git clone", isCorrect: false, questionId: 2 },
      { id: 6, response: "git init", isCorrect: false, questionId: 2 },
      {
        id: 7,
        response: "git remote add origin",
        isCorrect: true,
        questionId: 2,
      },
      { id: 8, response: "git branch", isCorrect: false, questionId: 2 },
    ],
    correct: 2,
  },
  {
    id: 3,
    question: "Qual a utilidade da chave SSH no GitHub?",
    options: [
      {
        id: 9,
        response: "Editar arquivos diretamente no repositório",
        isCorrect: false,
        questionId: 3,
      },
      {
        id: 10,
        response: "Garantir uma conexão segura e autenticada com o GitHub",
        isCorrect: true,
        questionId: 3,
      },
      {
        id: 11,
        response: "Fazer backup automático do repositório",
        isCorrect: false,
        questionId: 3,
      },
      {
        id: 12,
        response: "Criar novos commits",
        isCorrect: false,
        questionId: 3,
      },
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "Qual a finalidade de uma branch no Git?",
    options: [
      {
        id: 13,
        response: "Armazenar commits antigos para consulta",
        isCorrect: false,
        questionId: 4,
      },
      {
        id: 14,
        response:
          "Criar linhas de desenvolvimento independentes dentro do projeto",
        isCorrect: true,
        questionId: 4,
      },
      {
        id: 15,
        response: "Atualizar automaticamente o repositório remoto",
        isCorrect: false,
        questionId: 4,
      },
      {
        id: 16,
        response: "Instalar dependências do projeto",
        isCorrect: false,
        questionId: 4,
      },
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "Quando utilizamos o comando git merge, o que acontece?",
    options: [
      {
        id: 17,
        response: "Criamos uma nova branch",
        isCorrect: false,
        questionId: 5,
      },
      {
        id: 18,
        response: "Combinamos alterações de duas branches",
        isCorrect: true,
        questionId: 5,
      },
      {
        id: 19,
        response: "Deletamos uma branch",
        isCorrect: false,
        questionId: 5,
      },
      {
        id: 20,
        response: "Atualizamos o repositório remoto",
        isCorrect: false,
        questionId: 5,
      },
    ],
    correct: 1,
  },
  {
    id: 6,
    question: "Em caso de conflito de merge, qual é o papel do desenvolvedor?",
    options: [
      {
        id: 21,
        response: "Deixar o Git escolher automaticamente a versão correta",
        isCorrect: false,
        questionId: 6,
      },
      {
        id: 22,
        response:
          "Resolver manualmente o conflito editando os arquivos afetados",
        isCorrect: true,
        questionId: 6,
      },
      {
        id: 23,
        response: "Usar git fetch para eliminar o problema",
        isCorrect: false,
        questionId: 6,
      },
      {
        id: 24,
        response: "Apagar a branch que gerou o conflito",
        isCorrect: false,
        questionId: 6,
      },
    ],
    correct: 1,
  },
];
