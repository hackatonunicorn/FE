# Unicorn Frontend

A modern React TypeScript application for Unicorn - B2B SaaS AI Fundraising Platform.

## 🚀 Features

- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** with custom design system and animations
- **React Router** for client-side navigation
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for beautiful, consistent icons
- **Recharts** for interactive data visualization
- **Vite** for fast development and building
- **ESLint** for code quality and consistency

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, Layout)
│   └── charts/         # Chart components for data visualization
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── index.css           # Global styles and Tailwind imports
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unicorn-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The application uses a custom design system built on top of Tailwind CSS:

- **Primary Colors**: Blue-based palette for main actions and branding
- **Secondary Colors**: Gray-based palette for neutral elements
- **Accent Colors**: Purple-based palette for highlights and special features
- **Semantic Colors**: Success (green), Warning (yellow), Error (red)

### Custom Animations

- Fade in/out transitions
- Slide up/down animations
- Scale in effects
- Smooth hover states

## 📊 Components

### UI Components
- `Button` - Various button styles and states
- `Card` - Container components with different variants
- Form inputs and controls

### Layout Components
- `Layout` - Main application layout wrapper
- `Header` - Top navigation with search and user menu
- `Sidebar` - Side navigation with menu items

### Chart Components
- `RevenueChart` - Line chart for revenue trends
- `IndustryChart` - Pie chart for industry distribution

## 🔧 Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Add navigation item to sidebar if needed

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Export from the relevant index file
3. Add TypeScript types if needed

### Styling

- Use Tailwind CSS classes for styling
- Custom styles can be added to `src/index.css`
- Component-specific styles should use the `cn()` utility for class merging

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📝 License

MIT License - see LICENSE file for details.
