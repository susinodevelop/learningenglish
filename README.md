# Learning English

Repositorio educativo de inglés construido con Next.js. La web organiza material de gramática y vocabulario, incorpora práctica interactiva y deja preparada una sección de progreso para futuras cuentas de usuario.

## Stack

- Next.js 16.3.3 (App Router)
- React 19.2
- TypeScript 5.9
- CSS nativo
- ESLint 9 + configuración oficial de Next.js

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Estructura inicial

- `/` — dashboard y acceso a las áreas de aprendizaje
- `/grammar` — explicaciones gramaticales por temas y niveles
- `/vocabulary` — packs de vocabulario contextual
- `/games` — práctica interactiva; incluye quiz de vocabulario
- `/progress` — mejor resultado local y base para futura persistencia

## Próximas ampliaciones sugeridas

1. Modelo de contenido MDX o CMS para añadir material sin tocar componentes.
2. Autenticación y progreso persistente por usuario.
3. Más juegos: verb patterns, Open Cloze, collocations y phrasal verbs.
4. Buscador global, filtros por nivel y favoritos.
5. Tests unitarios/e2e y pipeline CI.
