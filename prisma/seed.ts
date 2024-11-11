import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Array de tipos de negócio
const businessTypes = [
  { icon: '✂️', label: 'Salão de Beleza' },
  { icon: '💆', label: 'Clínica de Estética' },
  { icon: '💈', label: 'Barbearia' },
  { icon: '👣', label: 'Podologia' },
  { icon: '💅', label: 'Esmalteria' },
  { icon: '👨‍⚕️', label: 'Clínica Médica' },
  { icon: '💆‍♂️', label: 'SPA e Massagem' },
  { icon: '🐾', label: 'Pet Shop e Veterinário' },
  { icon: '💉', label: 'Estúdio de Tatuagem' },
  { icon: '🦷', label: 'Clínica Odontológica' },
  { icon: '🏋️', label: 'Personal Trainer' },
  { icon: '🍏', label: 'Nutricionista' },
  { icon: '👩‍⚕️', label: 'Psicólogo(a)' },
  { icon: '🧑‍🏫', label: 'Professor(a) de Idiomas' },
  { icon: '🎸', label: 'Professor(a) de Música' },
  { icon: '⚖️', label: 'Advogado(a)' },
  { icon: '🔧', label: 'Serviços Gerais' },
  { icon: '🧑‍🔧', label: 'Mecânico(a)' },
  { icon: '🧘', label: 'Instrutor(a) de Yoga' },
  { icon: '🧹', label: 'Faxineiro(a)' },
  { icon: '❓', label: 'Outros Segmentos' },
];

async function main() {
  await prisma.businessType.createMany({
    data: businessTypes,
    skipDuplicates: true, // Evita duplicatas
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
