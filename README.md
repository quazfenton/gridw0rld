# gridWorld - Digital Art Gallery

An advanced, horizontally-swipeable digital gallery designed for showcasing multimedia art pieces with sophisticated text categorization, seasonal layouts, and cloud storage integration.

## Features

### Core Functionality
- **Horizontal Gallery**: Full-screen media display with swipe navigation
- **Multi-format Support**: Images, videos, audio, text, and markdown files
- **Smooth Transitions**: Animated transitions between media items with fade effects
- **Responsive Design**: Optimized for various screen sizes and orientations

### Text Content Intelligence
- **Advanced Categorization**: Automatically classifies text content into multiple categories:
  - Maximalist (full-page impactful phrases)
  - Aphorisms & Ramblings (with alternating left/right positioning)
  - Articles (structured content with headings)
  - Poetry & Verses (with line breaks preserved)
  - Captions, News, Magazine articles, and Listicles
- **Smart Styling**: Each category receives appropriate visual treatment
- **Zine-Style Layouts**: Multiple typography and design variations

### Media Handling
- **Audio Visualization**: Waveform visualizations for audio files using WaveSurfer.js
- **Auto-play**: Videos and audio auto-play when in view
- **Performance Optimized**: Lazy loading and smart preloading of content
- **Image Integration**: Automatic image discovery and association with text content

### Seasonal Layout System
- **Multiple Themes**: 4 distinct seasonal layouts (Classic Zine, Retro Futuristic, Minimalist, Cyberpunk)
- **Theme Variations**: 5 zine-style design variations per season
- **Easy Switching**: Simple parameter change to cycle between layouts
- **Archive Ready**: Hidden archive functionality for managing past layouts

### Cloud Storage Integration
- **Multiple Providers**: DigitalOcean Spaces, IPFS, Google Cloud Storage
- **Secure Credential Management**: Environment-based configuration
- **Fallback Support**: Local content folder as fallback
- **Scalable Architecture**: Designed for large media collections

## Getting Started

### Prerequisites
- A web server to host the application
- Optional: Cloud storage accounts for remote media

### Installation
1. Clone or download the repository
2. Place all files in your web server directory
3. Update the `.env` file with your cloud storage credentials (if using cloud storage)
4. Open `index.html` in a web browser

### Configuration
Edit the `.env` file to configure:
- Cloud storage settings (DigitalOcean, IPFS, Google Cloud)
- Gallery settings (preload distance, animation duration, etc.)
- Seasonal layout preferences
- Archive mode settings

## Usage

### Navigation
- **Swipe**: Swipe left/right on touch devices
- **Mouse**: Click and drag to swipe on desktop
- **Keyboard**: Use arrow keys to navigate

### Seasonal Layouts
- Press `Ctrl+Shift+1-4` to cycle through seasonal layouts during development
- Change the `CURRENT_SEASON` parameter in the .env file for permanent changes

### Content Organization
The gallery will attempt to load content from:
1. Cloud storage providers (if enabled)
2. Local `./content/` folder (fallback)
3. GitHub repository (fallback for demo)

## Content Types

### Text/Markdown Files
- Automatically categorized based on content structure
- Different styling for different content types
- Support for embedded images and captions

### Audio Files
- Waveform visualization
- Auto-play when in view
- Visualizer can be paused/resumed

### Images & Videos
- Full-screen display
- Responsive sizing
- Smooth loading transitions

## Development

### Architecture
- **Frontend**: HTML, CSS, JavaScript
- **Dependencies**: WaveSurfer.js, Marked (for markdown)
- **No Build Step**: Pure client-side implementation

### Extending the Gallery
- Add new seasonal layouts by extending the CSS
- Extend text categorization in the JavaScript
- Add new cloud storage providers by extending the API functions

## Security
- Client-side credential handling is for demo purposes only
- In production, use server-side credential management with signed URLs
- Never commit actual credentials to version control

## License
MIT License - see the LICENSE file for details.

## Acknowledgments
- WaveSurfer.js for audio visualization
- Marked for markdown parsing
- Friction for smooth animations