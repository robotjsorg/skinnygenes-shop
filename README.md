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

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.