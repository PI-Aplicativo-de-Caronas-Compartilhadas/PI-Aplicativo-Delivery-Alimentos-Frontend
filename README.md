# NutriGo 🥗

O **NutriGo** é um aplicativo de delivery focado em alimentos saudáveis. A plataforma conecta usuários a uma alimentação balanceada, permitindo a listagem, criação, edição e exclusão de produtos e categorias de alimentos de forma simples e intuitiva.

---

## 🛠️ Tecnologias Utilizadas

- **React** (com TypeScript e TSX)
- **Vite** (Ferramenta de build rápida)
- **Tailwind Css** (Estilização base e global)
- **ESLint** (Padronização e qualidade de código)

---

## 📁 Estrutura do Projeto

Abaixo está a arquitetura de pastas do projeto com base no diretório `src/`:

```text
src/
├── assets/             # Imagens, ícones e mídias estáticas
├── components/         # Componentes visuais reutilizáveis
│   ├── categoria/      # Módulos para gerenciamento de categorias (CRUD)
│   │   ├── cardcategoria/
│   │   ├── deletarcategoria/
│   │   ├── formcategoria/
│   │   ├── listacategorias/
│   │   └── modalcategoria/
│   ├── footer/         # Componente do rodapé da aplicação
│   ├── navbar/         # Componente da barra de navegação
│   └── produto/        # Módulos para gerenciamento de produtos alimentícios
├── models/             # Interfaces de tipagem do TypeScript
│   ├── Categoria.ts    # Modelo de dados da Categoria
│   └── Produto.ts      # Modelo de dados do Produto
├── pages/              # Telas e páginas estruturadas da aplicação
│   └── home/           # Tela inicial (Home.tsx)
├── services/           # Comunicação e requisições HTTP
│   └── Service.ts      # Métodos de integração com a API
├── App.css             # Estilos específicos do componente App
├── App.tsx             # Componente raiz principal
├── index.css           # Estilos globais da aplicação
└── main.tsx            # Ponto de entrada do React
```

---

## 👥 Desenvolvedores

Projeto desenvolvido em equipe pelos integrantes:

- Fabriciana Lima
- Fernando Garcia Cabeceiro
- Igor Kenzo Yamamoto
- Lilian Lacerda
- Roberta Rodrigues
- Vinicius Vicente
