export const questions: QuestionsType[] = [
  {
    id: 1,
    question: "Qual a principal diferença entre o Git e o GitHub?",
    options: [
      "O GitHub é um editor de texto e o Git é um sistema de versionamento",
      "O Git funciona localmente e o GitHub é uma plataforma de repositórios remotos",
      "O Git é pago e o GitHub é gratuito",
      "Ambos são a mesma coisa",
    ],
    correct: 1,
  },
  {
    id: 2,
    question:
      "Qual comando usamos para conectar um repositório local a um remoto no GitHub?",
    options: ["git clone", "git init", "git remote add origin", "git branch"],
    correct: 2,
  },
  {
    id: 3,
    question: "Qual a utilidade da chave SSH no GitHub?",
    options: [
      "Editar arquivos diretamente no repositório",
      "Garantir uma conexão segura e autenticada com o GitHub",
      "Fazer backup automático do repositório",
      "Criar novos commits",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "Qual a finalidade de uma branch no Git?",
    options: [
      "Armazenar commits antigos para consulta",
      "Criar linhas de desenvolvimento independentes dentro do projeto",
      "Atualizar automaticamente o repositório remoto",
      "Instalar dependências do projeto",
    ],
    correct: 1,
  },
  {
    id: 5,
    question: "Quando utilizamos o comando git merge, o que acontece?",
    options: [
      "Criamos uma nova branch",
      "Combinamos alterações de duas branches",
      "Deletamos uma branch",
      "Atualizamos o repositório remoto",
    ],
    correct: 1,
  },
  {
    id: 6,
    question: "Em caso de conflito de merge, qual é o papel do desenvolvedor?",
    options: [
      "Deixar o Git escolher automaticamente a versão correta",
      "Resolver manualmente o conflito editando os arquivos afetados",
      "Usar git fetch para eliminar o problema",
      "Apagar a branch que gerou o conflito",
    ],
    correct: 1,
  },
];

export type QuestionsType = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};
