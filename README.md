# Skinny Genes Shop

Welcome to the Skinny Genes Shop project! This is a React-based web application built with TypeScript, utilizing Mantine for UI components and pnpm for package management. The website serves as an online platform for showcasing cannabis seeds and related products.

## Project Structure

The project is organized as follows:

```
skinnygenes-shop
├── src
│   ├── components
│   │   ├── Layout
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── StrainCard.tsx
│   ├── pages
│   │   ├── LandingPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── StrainsPage.tsx
│   │   ├── StrainDetailPage.tsx
│   │   └── InteractiveStrainExplorer.tsx
│   ├── types
│   │   ├── product.ts
│   │   └── strain.ts
│   ├── App.tsx
│   └── main.tsx
├── public
│   └── images
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .github
│   └── workflows
│       └── static.yml
└── README.md
```

## Features

- **Landing Page**: Displays dummy images of cannabis and cannabis seeds.
- **Navigation Menu**: A sidebar menu with links to Home, Contact, Products, Strains, and an Interactive Strain Explorer.
- **Contact Page**: Contains contact information and a placeholder for a future Google Forms inline script.
- **Products Page**: Lists cannabis seed products with purchasing options for different quantities.
- **Product Detail Page**: Displays detailed information about each product.
- **Strains Page**: Showcases different cannabis strains bred by Skinnyjeans, including AI-generated text about the breeder's journey.
- **Strain Detail Page**: Provides detailed information about specific strains.
- **Interactive Strain Explorer**: A React Three page that visualizes the genetic evolution of cannabis plants.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/skinnygenes-shop.git
   cd skinnygenes-shop
   ```

2. Install dependencies using pnpm:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

This project is configured to be deployed on GitHub Pages. The deployment workflow is defined in the `.github/workflows/static.yml` file. This workflow compiles the TypeScript code into JavaScript and deploys the resulting static assets. Make sure to set up your GitHub repository to enable GitHub Pages.

### Single Page Application (SPA) Routing on GitHub Pages

Due to the nature of GitHub Pages serving static files, direct navigation to sub-paths (e.g., `/skinnygenes-shop/products`) or refreshing the page on such paths can result in a 404 error. To address this for Single Page Applications (SPAs) built with React Router, the following configurations have been applied:

1.  **React Router `basename`**: The `createBrowserRouter` configuration in `src/App.tsx` includes a `basename` prop set to `/skinnygenes-shop/`. This tells React Router the base URL segment where the application is deployed, allowing it to correctly construct and interpret routes.
2.  **`public/404.html` Redirection**: A custom `public/404.html` file is used as a fallback. When GitHub Pages encounters a 404 for a path that doesn't correspond to a physical file, it serves this `404.html`. This file contains a JavaScript snippet that redirects the browser to the application's root (`/skinnygenes-shop/index.html`). Once redirected, React Router takes over and handles the intended sub-path client-side.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.