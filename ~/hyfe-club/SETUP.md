# HYFE Club - Setup Guide

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Step-by-Step Setup

### 1. Navigate to Project Directory
```bash
cd hyfe-club
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- React 18
- React DOM
- Lucide React (icons)
- Vite (build tool)
- Tailwind CSS
- PostCSS & Autoprefixer

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### 5. Preview Production Build
```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port.

### Tailwind CSS Not Working
Make sure `index.css` is imported in `main.jsx`:
```javascript
import './index.css'
```

### Icons Not Displaying
Verify that `lucide-react` is installed:
```bash
npm install lucide-react
```

## Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Features to Test

1. **Login/Logout**: Click the Login button in the navbar
2. **Admin Mode**: When logged in, you'll see:
   - Edit buttons on team cards
   - Archive button to move current batch to history
3. **Team Cards**: Click on any team card
4. **History Accordion**: Click on batch bars to expand/collapse
5. **Responsive Design**: Resize browser to test mobile layout

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- Hot Module Replacement (HMR) is enabled - changes will reflect immediately
- React Fast Refresh is enabled for component updates
- Tailwind CSS classes are compiled on-the-fly during development

## Support

For issues or questions, please refer to the documentation:
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- Lucide React: https://lucide.dev/
