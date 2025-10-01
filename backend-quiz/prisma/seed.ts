/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.questions.deleteMany();
  await prisma.options.deleteMany();
  await prisma.questions.create({
    data: {
      question: 'Qual a principal diferença entre o Git e o GitHub?',
      options: {
        create: [
          {
            response:
              'O GitHub é um editor de texto e o Git é um sistema de versionamento',
            isCorrect: false,
          },
          {
            response:
              'O Git funciona localmente e o GitHub é uma plataforma de repositórios remotos',
            isCorrect: true,
          },
          { response: 'O Git é pago e o GitHub é gratuito', isCorrect: false },
          { response: 'Ambos são a mesma coisa', isCorrect: false },
        ],
      },
    },
  });

  await prisma.questions.create({
    data: {
      question:
        'Qual comando usamos para conectar um repositório local a um remoto no GitHub?',
      options: {
        create: [
          { response: 'git clone', isCorrect: false },
          { response: 'git init', isCorrect: false },
          { response: 'git remote add origin', isCorrect: true },
          { response: 'git branch', isCorrect: false },
        ],
      },
    },
  });

  await prisma.questions.create({
    data: {
      question: 'Qual a utilidade da chave SSH no GitHub?',
      options: {
        create: [
          {
            response: 'Editar arquivos diretamente no repositório',
            isCorrect: false,
          },
          {
            response: 'Garantir uma conexão segura e autenticada com o GitHub',
            isCorrect: true,
          },
          {
            response: 'Fazer backup automático do repositório',
            isCorrect: false,
          },
          { response: 'Criar novos commits', isCorrect: false },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
