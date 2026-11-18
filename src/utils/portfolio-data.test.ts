import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TECH_STACK,
  ABOUT_DATA,
  ABOUT_POST_ITS,
  PROJECTS,
  VIDEO_PROJECTS,
  EDUCATION_TIMELINE,
  EXPERIENCE_TIMELINE,
  validateTechStackRequirements,
  validateEducationTimelineRequirements,
  getTechStackById,
} from './portfolio-data';

test('TECH_STACK contains all requested technologies', () => {
  assert.equal(validateTechStackRequirements(), true);

  const java = getTechStackById('java');
  assert.ok(java);
  assert.equal(java?.name, 'Java');

  const spring = getTechStackById('spring-boot');
  assert.ok(spring);
  assert.equal(spring?.alias, 'Bota Primavera');

  const postgres = getTechStackById('postgresql');
  assert.ok(postgres);
  assert.equal(postgres?.name, 'PostgreSQL');

  const mysql = getTechStackById('mysql');
  assert.ok(mysql);
  assert.equal(mysql?.name, 'MySQL');

  const docker = getTechStackById('docker');
  assert.ok(docker);
  assert.equal(docker?.alias, 'Estivador');

  const junit = getTechStackById('junit');
  assert.ok(junit);
  assert.equal(junit?.name, 'JUnit');

  const github = getTechStackById('github');
  assert.ok(github);
  assert.equal(github?.name, 'GitHub');
  assert.equal(github?.url, 'https://github.com/annasb-oss');
});

test('ABOUT_DATA includes backend student profile and photo path', () => {
  assert.match(ABOUT_DATA.role, /Estudante de Programação/);
  assert.match(ABOUT_DATA.focus, /Back-end/i);
  assert.ok(ABOUT_DATA.photoUrl.includes('WhatsApp_Image_2026-11-12_at_14.43.43_ad621477.jpeg'));
  assert.ok(ABOUT_DATA.bioParagraphs.length >= 2);
  assert.ok(ABOUT_DATA.pillars.length >= 4);
});

test('ABOUT_POST_ITS provides colorful square notes for About section', () => {
  assert.equal(ABOUT_POST_ITS.length, 6);
  const colors = new Set(ABOUT_POST_ITS.map((item) => item.bgClass));
  assert.equal(colors.size, 6);
});

test('PROJECTS includes GitHub repository adivinhe-o-numero with Harvard study indicator', () => {
  const repo = PROJECTS.find((p) => p.id === 'adivinhe-o-numero');
  assert.ok(repo);
  assert.equal(repo?.repoUrl, 'https://github.com/annasb-oss/adivinhe-o-numero');
  assert.equal(repo?.institution, 'Harvard');
  assert.match(repo?.studyLabel ?? '', /estudo/i);
});

test('VIDEO_PROJECTS includes the PAC-MAN study game and Adivinhe o Número project', () => {
  assert.ok(VIDEO_PROJECTS.length >= 2);
  const pacman = VIDEO_PROJECTS.find((p) => p.id === 'pacman');
  assert.ok(pacman);
  assert.equal(pacman?.title, 'PAC-MAN · Arcade');
  assert.equal(pacman?.repoUrl, 'https://annasb-oss.github.io/pacman/');
  assert.match(pacman?.description ?? '', /projeto de estudo/i);
  assert.match(pacman?.description ?? '', /não é um produto oficial/i);

  const guess = VIDEO_PROJECTS.find((p) => p.id === 'adivinhe-o-numero');
  assert.ok(guess);
  assert.equal(guess?.title, 'Adivinhe o Número');
  assert.equal(guess?.gifUrl, '/assets/adivinhe-o-numero.png?v=20261118-1732');
  assert.equal(guess?.repoUrl, 'https://github.com/annasb-oss/adivinhe-o-numero');
});

test('EDUCATION_TIMELINE preserves exact CV entries without fabricated dates or certifications', () => {
  assert.equal(validateEducationTimelineRequirements(), true);

  const unimar = EDUCATION_TIMELINE[0];
  assert.equal(unimar.courseOrRole, 'Bacharelado em Administração de Empresas');
  assert.match(unimar.description ?? '', /maio de 2024/i);
  assert.match(unimar.description ?? '', /2027/);

  const dio = EDUCATION_TIMELINE[1];
  assert.equal(dio.courseOrRole, 'Cursos de tecnologia concluídos.');
  assert.equal(dio.tags?.includes('Certificação'), false);

  const bradesco = EDUCATION_TIMELINE[3];
  assert.equal(bradesco.courseOrRole, 'Crie um site simples usando HTML, CSS e JavaScript.');
  assert.match(bradesco.description ?? '', /2 horas/);

  const harvard = EDUCATION_TIMELINE[4];
  assert.equal(harvard.courseOrRole, "CS50's Introduction to Programming with Scratch.");
  assert.ok(harvard.tags?.includes('Em andamento'));

  const duolingo = EDUCATION_TIMELINE[6];
  assert.equal(duolingo.courseOrRole, 'Estudos de inglês.');
  assert.ok(duolingo.tags?.includes('Nível: Iniciante'));
});

test('EXPERIENCE_TIMELINE includes real projects/stack and prepared future slot without invented companies', () => {
  assert.ok(EXPERIENCE_TIMELINE.length >= 4);
  const githubProj = EXPERIENCE_TIMELINE.find((e) => e.id === 'projeto-adivinhe-o-numero');
  assert.equal(githubProj?.linkUrl, 'https://github.com/annasb-oss/adivinhe-o-numero');

  const backend = EXPERIENCE_TIMELINE.find((e) => e.id === 'estudos-backend-java');
  assert.deepEqual(backend?.techIcons, ['java', 'spring', 'postgres', 'mysql', 'docker', 'junit']);

  const reserved = EXPERIENCE_TIMELINE.find((e) => e.isPlaceholder === true);
  assert.ok(reserved);
});
