# Moon Phase Tracker

A web application for tracking lunar phases with real-time astronomical calculations and visual representations.

## Overview

This application displays current moon phase information including illumination percentage, rise and set times, and upcoming lunar events. It features an interactive grid showing all eight phases of the lunar cycle with detailed descriptions.

## Features

- Real-time moon phase calculation based on user location
- Current illumination percentage with visual indicator
- Moonrise and moonset times for your timezone
- Next full moon countdown
- Interactive grid displaying all eight lunar phases
- Responsive design for mobile and desktop
- Dark theme optimized for nighttime viewing

## Technology Stack

- Next.js 15.1.3 with App Router
- React 19
- TypeScript
- Tailwind CSS
- SunCalc for astronomical calculations
- date-fns for date manipulation

## Prerequisites

- Node.js 18.x or higher
- Bun package manager

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies:

```bash
bun install
```

## Development

Run the development server:

```bash
bun run dev
```

Open http://localhost:3000 in your browser.

## Building for Production

Create an optimized production build:

```bash
bun run build
```

Start the production server:

```bash
bun start
```

## Project Structure

```
app/                 - Next.js application routes and layouts
  page.tsx          - Main application page
  layout.tsx        - Root layout component
  globals.css       - Global styles and CSS variables
  api/              - API routes (reserved for future use)

components/         - React components
  moon-tracker.tsx  - Primary moon phase tracking widget
  moon-phases-grid.tsx - Eight-phase lunar cycle display
  moon-phase-icon.tsx  - SVG moon visualization
  header.tsx        - Application header
  footer.tsx        - Application footer
  hero.tsx          - Hero section

lib/                - Utility functions
  utils.ts          - Helper functions for className handling

hooks/              - Custom React hooks
```

## Configuration

### TypeScript

The project uses strict TypeScript configuration. See tsconfig.json for compiler options.

### Tailwind CSS

Custom theme configuration is defined in tailwind.config.ts. The application uses a dark theme with customizable CSS variables.

### Next.js

Next.js configuration is minimal by default. See next.config.ts for framework settings.

## Key Dependencies

- next: Web framework
- react: UI library
- suncalc: Astronomical calculations for moon phases
- date-fns: Date formatting and manipulation
- tailwind-merge: Utility for merging Tailwind CSS classes
- clsx: Conditional className construction

## Browser Support

The application requires a modern browser with support for:

- ES2020 JavaScript features
- CSS Grid and Flexbox
- Geolocation API (for accurate rise/set times)

## Geolocation

The application requests user location to provide accurate moonrise and moonset times. If permission is denied, the application continues to function with limited location-specific features.

## Performance Considerations

- Server-side rendering for initial page load
- Optimized bundle size with Next.js automatic code splitting
- Lazy loading of non-critical components
- Memoized astronomical calculations

## License

See LICENSE file for details.

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Submit a pull request with a description of changes

## Known Limitations

- Moonrise and moonset times require geolocation access
- Calculations are based on SunCalc library accuracy
- Timezone handling relies on browser locale settings

## Troubleshooting

### Development server not starting

Ensure all dependencies are installed:

```bash
rm -rf node_modules bun.lock
bun install
```

### Build errors

Clear Next.js cache:

```bash
rm -rf .next
bun run build
```

### Geolocation not working

Check browser permissions and ensure the site is served over HTTPS in production.

## Future Enhancements

- Historical moon phase data
- Calendar view with lunar events
- Manual location input option
- Progressive Web App capabilities
- API endpoints for programmatic access
- Multiple language support
