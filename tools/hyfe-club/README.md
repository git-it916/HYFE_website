# HYFE - Financial Engineering Club

A professional single-page React application for the Hanyang Financial Engineering Club (HYFE).

## Features

### 🎨 Design
- Professional financial/academic aesthetic
- Navy Blue, White, and Grey color scheme
- Modern sans-serif typography
- Fully responsive (mobile and desktop)

### 🏗️ Components

#### Header (Navbar)
- Club logo and name on the left
- Navigation links: About, Teams
- Login/Logout toggle button

#### Current Teams Section
- Displays the current batch (38th Teams)
- 4 team cards in a responsive grid:
  - **Quant**: Quantitative Analysis & Algorithmic Trading
  - **IB**: Investment Banking & Corporate Finance
  - **Research**: Financial Research & Market Analysis
  - **Derivative**: Derivatives Trading & Risk Management
- Click on cards to navigate to team details

#### History Section
- Accordion-style list of past batches (37th, 36th, 35th, 34th)
- Click on a batch bar to expand and view the 4 team buttons
- Teams from each batch are clickable

#### Admin Mode Features
When logged in:
- ✅ "Edit" buttons appear on team cards
- ✅ "Archive Current Teams to History" button
- ✅ Archive functionality moves current batch to history and increments batch number

### 🔧 Tech Stack
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Lucide React** for icons
- Modern ES6+ JavaScript

## Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

## Usage

### Login/Logout
Click the "Login" button in the navbar to toggle admin mode.

### Admin Mode
When logged in:
1. **Edit Teams**: Click the "Edit Team" button on any team card
2. **Archive Teams**: Click "Archive Current Teams to History" to:
   - Move the current batch (e.g., 38th) to the history section
   - Increment the batch number (e.g., 38th → 39th)

### View History
- Click on any batch bar in the History section to expand it
- View and click on team buttons for that specific batch

## Project Structure

```
hyfe-club/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Customization

### Adding New Teams
Modify the `currentBatch.teams` array in `App.jsx`:

```javascript
const [currentBatch, setCurrentBatch] = useState({
  number: 38,
  teams: [
    {
      id: 1,
      name: 'Your Team Name',
      icon: YourIcon, // Import from lucide-react
      description: 'Team description',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    // ... more teams
  ]
});
```

### Changing Colors
Edit the `tailwind.config.js` file to customize the navy color palette:

```javascript
colors: {
  navy: {
    // Your custom shades
  },
},
```

## License

© 2024 HYFE - Hanyang Financial Engineering Club. All rights reserved.
