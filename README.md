# Skinny Genes Shop

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
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

This project is configured to be deployed on GitHub Pages. The deployment workflow is defined in the `.github/workflows/static.yml` file. This workflow compiles the TypeScript code into JavaScript and deploys the resulting static assets. Make sure to set up your GitHub repository to enable GitHub Pages.

### Single Page Application (SPA) Routing on GitHub Pages

Due to the nature of GitHub Pages serving static files, direct navigation to sub-paths (e.g., `/skinnygenes-shop/products`) or refreshing the page on such paths can result in a 404 error. To address this for Single Page Applications (SPAs) built with React Router, the following configurations have been applied:

1.  **Dynamic Base URL (`import.meta.env.BASE_URL`)**:
    *   **React Router `basename`**: The `createBrowserRouter` configuration in `src/App.tsx` now dynamically sets its `basename` prop using `import.meta.env.BASE_URL`. This ensures that the React Router correctly handles routing for both local development (where `BASE_URL` is `/`) and GitHub Pages deployment (where `BASE_URL` is `/skinnygenes-shop/`).
    *   **Image Paths**: All image paths within the application's components have been updated to use `import.meta.env.BASE_URL` as a prefix. This ensures that images are loaded from the correct base directory, regardless of the deployment environment.
2.  **`public/404.html` Redirection**: A custom `public/404.html` file is used as a fallback. When GitHub Pages encounters a 404 for a path that doesn't correspond to a physical file, it serves this `404.html`. This file contains a JavaScript snippet that redirects the browser to the application's root (`/skinnygenes-shop/index.html`). Once redirected, React Router takes over and handles the intended sub-path client-side.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.