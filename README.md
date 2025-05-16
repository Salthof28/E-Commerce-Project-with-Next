# Milestone-3

## Overview
This is a modern e-commerce website built with **Next.js** that allows users to easily browse, search, and filter products by categories. Users can view detailed information about each product and manage their shopping cart by adding or removing items with a smooth and responsive user experience.

## Features Implemented
- **Next.js Routing & Navigation**
  - File-based routing with dynamic route pages (e.g., `[id].tsx`)
  - Client-side navigation using `Link` from `next/link`
  - Dynamic route parameter handling for product details
  - Navigation between pages without full reloads for seamless UX

- **Data Fetching**
  - Static Site Generation (SSG) with `getStaticProps()`
  - Server-Side Rendering (SSR) with `getServerSideProps()`
  - Client-side data fetching with `useEffect()` and Fetch API
  - Robust error handling and loading states management during data fetching

- **UI & State Management**
  - Clean and reusable React components with JSX syntax
  - State management using `useState` and side effects with `useEffect`
  - Passing and handling props effectively across components

- **Additional Features**
  - Product listing with category filters
  - Search functionality for products
  - Shopping cart management with add, remove, and quantity adjustment

## Technologies Used
- **Next.js** — React framework for server-side rendering and static site generation
- **React** — UI library with hooks for state and lifecycle management
- **TypeScript** — Type-safe JavaScript for robust development
- **Tailwind CSS** — Utility-first CSS framework for rapid styling
- **Fetch API** — Native web API for data fetching

## Demo

**Live Demo:** [deShopper](https://e-commerce-project-with-next.vercel.app/)

## 📜 How to Use
1. clone this repository:
```sh
git clone https://github.com/revou-fsse-feb25/milestone-3-Salthof28.git
```
2. Install next and run project
```sh
cd milestone-3
npm install
npm run build
npm start
```

## Author
:bulb: Salman Althof

