export interface TechItem {
  id: string;
  name: string;
  alias?: string;
  category: string;
  description: string;
  level: string;
  iconName: 'java' | 'spring' | 'postgres' | 'mysql' | 'docker' | 'junit' | 'github';
  badgeColor: string;
  url?: string;
  linkLabel?: string;
}

export interface AboutData {
  name: string;
  role: string;
  focus: string;
  photoUrl: string;
  summary: string;
  bioParagraphs: string[];
  pillars: {
    title: string;
    description: string;
  }[];
}

export const TECH_STACK: TechItem[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'Linguagem Principal',
    description: 'Orientação a Objetos (POO), generics, streams, coleções robustas e tipagem forte para o servidor.',
    level: 'Core Back-end',
    iconName: 'java',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    alias: 'Bota Primavera',
    category: 'Framework Back-end',
    description: 'Criação de APIs RESTful, injeção de dependências, Spring Data JPA, Hibernate e arquitetura modular.',
    level: 'Framework Principal',
    iconName: 'spring',
    badgeColor: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Banco de Dados Relacional',
    description: 'Modelagem relacional, transações ACID, integridade referencial, índices e queries complexas.',
    level: 'Banco de Dados',
    iconName: 'postgres',
    badgeColor: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Banco de Dados Relacional',
    description: 'Gerenciamento de banco de dados relacional, consultas SQL otimizadas e normalização de tabelas.',
    level: 'Banco de Dados',
    iconName: 'mysql',
    badgeColor: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30',
  },
  {
    id: 'docker',
    name: 'Docker',
    alias: 'Estivador',
    category: 'Conteinerização & Deploy',
    description: 'Isolamento de serviços em containers, Dockerfile padronizados e orquestração de bancos com Docker Compose.',
    level: 'DevOps & Ambiente',
    iconName: 'docker',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'junit',
    name: 'JUnit',
    category: 'Testes Automatizados',
    description: 'Garantia de qualidade e regressão zero com testes unitários, testes de integração e asserções rigorosas.',
    level: 'Qualidade & TDD',
    iconName: 'junit',
    badgeColor: 'from-rose-500/20 to-red-500/20 text-rose-400 border-rose-500/30',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Versionamento & Repositórios',
    description: 'Controle de versão com Git, organização de código e publicação dos meus repositórios e projetos.',
    level: 'Perfil & Código',
    iconName: 'github',
    badgeColor: 'from-zinc-400/20 to-slate-500/20 text-zinc-200 border-zinc-500/40',
    url: 'https://github.com/annasb-oss',
    linkLabel: 'github.com/annasb-oss',
  },
];

export const ABOUT_DATA: AboutData = {
  name: 'Desenvolvedora Back-end',
  role: 'Estudante de Programação',
  focus: 'Desenvolvimento Back-end & Arquitetura de Software',
  photoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-12_at_14.43.43_ad621477.jpeg',
  summary:
    'Estudante dedicada de programação com foco total no desenvolvimento de Back-end, construindo APIs seguras, eficientes e escaláveis.',
  bioParagraphs: [
    'Estudante de programação com foco em desenvolvimento Back-end, criando APIs seguras, organizadas e escaláveis.',
    'Trabalho com Java, Spring Boot, PostgreSQL, MySQL e Docker, aplicando Clean Code e testes automatizados com JUnit.',
  ],
  pillars: [
    {
      title: 'APIs RESTful & Arquitetura',
      description: 'Construção de endpoints seguros, padronização HTTP, DTOs e validação de regras de negócio.',
    },
    {
      title: 'Bancos de Dados Relacionais',
      description: 'Modelagem lógica, relacionamentos (1:N, N:M), migrations e consultas eficientes.',
    },
    {
      title: 'Testes Automatizados',
      description: 'Cultura de testes com JUnit 5 para garantir estabilidade, confiabilidade e manutenibilidade.',
    },
    {
      title: 'Ambientes Conteinerizados',
      description: 'Uso prático do Docker para subir bancos, aplicações e microsserviços de forma isolada.',
    },
  ],
};

export interface PostItNote {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  bgClass: string;
  accentClass: string;
  tiltClass: string;
}

export const ABOUT_POST_ITS: PostItNote[] = [
  {
    id: 'perfil',
    tag: '01 • PERFIL',
    title: 'Dev Back-end',
    highlight: 'Estudante de programação focada em lógica, segurança e APIs.',
    bgClass: 'bg-[#FEF08A]',
    accentClass: 'bg-amber-900/10 text-amber-950',
    tiltClass: '-rotate-2',
  },
  {
    id: 'stack',
    tag: '02 • JAVA & SPRING',
    title: 'APIs RESTful',
    highlight: 'Java, Spring Boot, JPA, DTOs e regras de negócio.',
    bgClass: 'bg-[#FBCFE8]',
    accentClass: 'bg-pink-900/10 text-pink-950',
    tiltClass: 'rotate-1',
  },
  {
    id: 'dados',
    tag: '03 • PERSISTÊNCIA',
    title: 'Bancos SQL',
    highlight: 'PostgreSQL e MySQL com modelagem relacional e ACID.',
    bgClass: 'bg-[#BAE6FD]',
    accentClass: 'bg-sky-900/10 text-sky-950',
    tiltClass: '-rotate-1',
  },
  {
    id: 'qualidade',
    tag: '04 • BOAS PRÁTICAS',
    title: 'Clean Code & TDD',
    highlight: 'Arquitetura em camadas e testes automatizados com JUnit.',
    bgClass: 'bg-[#BBF7D0]',
    accentClass: 'bg-emerald-900/10 text-emerald-950',
    tiltClass: 'rotate-2',
  },
  {
    id: 'infra',
    tag: '05 • AMBIENTE',
    title: 'Docker & Containers',
    highlight: 'Serviços isolados com Dockerfile e Docker Compose.',
    bgClass: 'bg-[#DDD6FE]',
    accentClass: 'bg-violet-900/10 text-violet-950',
    tiltClass: '-rotate-1',
  },
  {
    id: 'meta',
    tag: '06 • OBJETIVO',
    title: 'Pronta p/ Desafios',
    highlight: 'Em busca de oportunidades para evoluir em times Back-end.',
    bgClass: 'bg-[#FED7AA]',
    accentClass: 'bg-orange-900/10 text-orange-950',
    tiltClass: 'rotate-1',
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  repoUrl: string;
  repoPath: string;
  description: string;
  studyLabel: string;
  institution: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'adivinhe-o-numero',
    title: 'Adivinhe o Número',
    repoUrl: 'https://github.com/annasb-oss/adivinhe-o-numero',
    repoPath: 'annasb-oss/adivinhe-o-numero',
    description:
      'Projeto prático publicado no GitHub desenvolvido durante a trilha de estudos com Harvard.',
    studyLabel: 'Em Estudo',
    institution: 'Harvard',
  },
];

export interface VideoProjectItem {
  id: string;
  title: string;
  description: string;
  gifUrl?: string;
  gifAlt?: string;
  repoUrl?: string;
  repoLabel?: string;
  isPlaceholder?: boolean;
}

export const VIDEO_PROJECTS: VideoProjectItem[] = [
  {
    id: 'pacman',
    title: 'PAC-MAN · Arcade',
    description:
      'Jogo arcade independente desenvolvido como projeto de estudo em programação, com labirinto, fantasmas, frutas coletáveis, pontuação e fases. Não é um produto oficial da franquia PAC-MAN.',
    repoUrl: 'https://annasb-oss.github.io/pacman/',
    repoLabel: 'Jogar PAC-MAN',
  },
  {
    id: 'nebula-search',
    title: 'Nebula Search',
    description:
      'Web Crawler desenvolvido em Java e Spring Boot para rastrear páginas públicas, extrair metadados e links, respeitando regras de segurança, robots.txt e limites por domínio.',
    gifUrl: `${import.meta.env.BASE_URL}assets/nebula-robot-spider.svg?v=20261118-spider-v3`,
    gifAlt: 'Aranha crawler destacando os caminhos de rastreamento em uma rede digital',
    repoUrl: 'https://annasb-oss.github.io/Nebula-search/',
    repoLabel: 'Acessar apresentação do Nebula Search',
  },
  {
    id: 'adivinhe-o-numero',
    title: 'Adivinhe o Número',
    description:
      'Jogo de adivinhação feito no Scratch como primeiro projeto prático de programação. O computador escolhe um número secreto entre 1 e 10, e o jogador tenta descobri-lo fazendo palpites. A cada erro, o jogo indica se o palpite foi baixo demais ou alto demais.',
    gifUrl: `${import.meta.env.BASE_URL}assets/adivinhe-o-numero.png?v=20261118-1732`,
    gifAlt: 'Tela do jogo Adivinhe o Número feito no Scratch exibindo o botão de iniciar',
    repoUrl: 'https://github.com/annasb-oss/adivinhe-o-numero',
    repoLabel: 'github.com/annasb-oss/adivinhe-o-numero',
  },
];

export type TimelineIconType =
  | 'university'
  | 'dio'
  | 'freecodecamp'
  | 'bradesco'
  | 'harvard'
  | 'unimar-extra'
  | 'duolingo'
  | 'udemy'
  | 'github'
  | 'backend'
  | 'placeholder';

export interface TimelineEntry {
  id: string;
  numberLabel: string;
  institution: string;
  courseOrRole: string;
  description?: string;
  period?: string;
  tags?: string[];
  icon: TimelineIconType;
  techIcons?: ('java' | 'spring' | 'postgres' | 'mysql' | 'docker' | 'junit' | 'github')[];
  linkUrl?: string;
  linkLabel?: string;
  certificateUrls?: { label: string; url: string }[];
  isPlaceholder?: boolean;
}

export const EDUCATION_TIMELINE: TimelineEntry[] = [
  {
    id: 'unimar-graduacao',
    numberLabel: '01',
    institution: 'Universidade de Marília (UNIMAR)',
    courseOrRole: 'Bacharelado em Administração de Empresas',
    description: 'Início: maio de 2024 | Previsão de conclusão: 2027.',
    period: 'Mai 2024 – 2027',
    tags: ['Graduação', 'Em andamento'],
    icon: 'university',
  },
  {
    id: 'dio-cursos',
    numberLabel: '02',
    institution: 'DIO (Digital Innovation One)',
    courseOrRole: 'Cursos e formações em tecnologia concluídos.',
    description: 'Trilhas de aprendizagem com conteúdos práticos de programação e desenvolvimento, complementadas por certificados dos estudos realizados.',
    tags: ['Concluído'],
    icon: 'dio',
    certificateUrls: [
      { label: 'Fundamentos da IA Moderna', url: 'certificado-dio-fundamentos-ia-moderna.pdf' },
      { label: 'Introdução à Engenharia de Prompts', url: 'certificado-dio-introducao-engenharia-de-prompts.pdf' },
    ],
  },
  {
    id: 'freecodecamp-estudos',
    numberLabel: '03',
    institution: 'freeCodeCamp',
    courseOrRole: 'Estudos complementares em programação.',
    description: 'Aprendizado contínuo por meio de conteúdos e exercícios para fortalecer fundamentos de programação e raciocínio lógico.',
    icon: 'freecodecamp',
  },
  {
    id: 'fundacao-bradesco',
    numberLabel: '04',
    institution: 'Fundação Bradesco',
    courseOrRole: 'Crie um site simples usando HTML, CSS e JavaScript.',
    description: 'Cursos concluídos na Fundação Bradesco.',
    period: '2 cursos',
    tags: ['Concluído'],
    icon: 'bradesco',
    certificateUrls: [
      { label: 'HTML, CSS e JavaScript', url: 'certificado-fundacao-bradesco-html-css-javascript.pdf' },
      { label: 'Matemática Financeira HP 12C', url: 'certificado-fundacao-bradesco-matematica-financeira-hp12c.pdf' },
    ],
  },
  {
    id: 'harvard-edx-cs50',
    numberLabel: '05',
    institution: 'Harvard / edX',
    courseOrRole: "CS50's Introduction to Programming with Scratch.",
    description: 'Estudo dos fundamentos da programação por meio do Scratch. Paralelamente, também estou aprimorando meu inglês para ampliar meu acesso a conteúdos e oportunidades na área de tecnologia.',
    period: 'Em andamento',
    tags: ['Em andamento'],
    icon: 'harvard',
  },
  {
    id: 'unimar-extracurricular',
    numberLabel: '06',
    institution: 'UNIMAR',
    courseOrRole: 'Formações e atividades extracurriculares.',
    description: 'Atividades complementares à graduação, voltadas à ampliação de conhecimentos e ao desenvolvimento acadêmico.',
    icon: 'unimar-extra',
  },
  {
    id: 'duolingo-ingles',
    numberLabel: '07',
    institution: 'Duolingo',
    courseOrRole: 'Estudos contínuos de inglês.',
    description: 'Prática de vocabulário, leitura e compreensão para desenvolver gradualmente a comunicação no idioma.',
    period: 'Em desenvolvimento',
    tags: ['Nível: Iniciante'],
    icon: 'duolingo',
  },
  {
    id: 'udemy-cursos',
    numberLabel: '08',
    institution: 'Udemy',
    courseOrRole: 'Cursos complementares em tecnologia.',
    description: 'Plataforma de aprendizagem complementar para ampliar conhecimentos e desenvolver novas habilidades na área de programação.',
    icon: 'udemy',
  },
];

export const EXPERIENCE_TIMELINE: TimelineEntry[] = [
  {
    id: 'projeto-adivinhe-o-numero',
    numberLabel: '01',
    institution: 'Adivinhe o Número',
    courseOrRole: 'Projeto prático publicado no GitHub',
    description:
      'Projeto prático publicado no GitHub desenvolvido durante a trilha de estudos com Harvard.',
    period: 'Em Estudo',
    tags: ['Projeto', 'Em Estudo'],
    icon: 'github',
    linkUrl: 'https://github.com/annasb-oss/adivinhe-o-numero',
    linkLabel: 'annasb-oss/adivinhe-o-numero',
  },
  {
    id: 'estudos-backend-java',
    numberLabel: '02',
    institution: 'Desenvolvimento Back-end & Projetos Práticos',
    courseOrRole: 'Ecossistema Java e Spring Boot',
    description:
      'Desenvolvimento de serviços RESTful com Java e Spring Boot, bancos de dados relacionais com PostgreSQL e MySQL, conteinerização com Docker, Clean Code e testes automatizados com JUnit.',
    tags: ['Desenvolvimento', 'Projetos Práticos'],
    icon: 'backend',
    techIcons: ['java', 'spring', 'postgres', 'mysql', 'docker', 'junit'],
  },
  {
    id: 'github-repositorios',
    numberLabel: '03',
    institution: 'GitHub — Portfólio de Código',
    courseOrRole: 'Publicação e versionamento de projetos',
    description:
      'Repositório público reunindo exercícios, códigos de estudo e projetos em evolução contínua.',
    tags: ['Projeto', 'Versionamento'],
    icon: 'github',
    linkUrl: 'https://github.com/annasb-oss',
    linkLabel: 'github.com/annasb-oss',
  },
  {
    id: 'espaco-futuras-experiencias',
    numberLabel: '04',
    institution: 'Espaço reservado para novas experiências',
    courseOrRole: 'Experiência profissional e novos projetos Back-end',
    description:
      'Área preparada para registro posterior de estágios, atuações profissionais, empresas, períodos e novos projetos desenvolvidos.',
    period: 'Em breve',
    tags: ['Espaço reservado'],
    icon: 'placeholder',
    isPlaceholder: true,
  },
];

export function getTechStackById(id: string): TechItem | undefined {
  return TECH_STACK.find((item) => item.id === id);
}

export function validateTechStackRequirements(): boolean {
  const requiredIds = ['java', 'spring-boot', 'postgresql', 'mysql', 'docker', 'junit', 'github'];
  return requiredIds.every((req) => TECH_STACK.some((t) => t.id === req));
}

export function validateEducationTimelineRequirements(): boolean {
  const requiredInstitutions = [
    'Universidade de Marília (UNIMAR)',
    'DIO (Digital Innovation One)',
    'freeCodeCamp',
    'Fundação Bradesco',
    'Harvard / edX',
    'UNIMAR',
    'Duolingo',
  ];
  return (
    EDUCATION_TIMELINE.length === requiredInstitutions.length &&
    requiredInstitutions.every((name, idx) => EDUCATION_TIMELINE[idx]?.institution === name)
  );
}

