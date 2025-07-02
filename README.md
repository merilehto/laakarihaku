# Lääkärihaku - Finnish Healthcare Booking Aggregator

A React TypeScript application that aggregates doctor appointments from Finnish healthcare providers (Mehiläinen, Terveystalo, Pihlajalinna, Aava).

## Features

- 🏥 **Finnish Healthcare Providers**: Aggregates appointments from major Finnish healthcare chains
- 🔍 **Smart Search**: Search by doctor name, specialty, or location
- 📱 **Mobile-First Design**: Responsive design optimized for mobile devices
- 🎯 **Advanced Filtering**: Filter by provider, availability, specialty, and languages
- ⚡ **Real-time Results**: Instant search and filtering
- 🇫🇮 **100% Finnish UI**: All text and interface in Finnish

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd laakarihaku

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect it's a Vite project and configure the build settings

### Option 3: Deploy from current directory

```bash
# From the project root directory
npx vercel --prod
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Main header with branding
│   ├── SearchBar.tsx       # Search input with result count
│   ├── DoctorCard.tsx      # Individual doctor card
│   ├── FilterSidebar.tsx   # Filtering options
│   └── BookingModal.tsx    # Booking confirmation modal
├── data/
│   └── doctors.json        # Mock data with 24 Finnish doctors
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## Mock Data

The application includes 24 mock doctors with:
- **50%** from Mehiläinen
- **25%** from Terveystalo  
- **17%** from Pihlajalinna
- **8%** from Aava

Availability distribution:
- **25%** "Tänään vapaana"
- **35%** "Huomenna"
- **40%** "Tällä viikolla"

## Key Features

### Search Functionality
- Search by doctor name, specialty, or location
- Real-time filtering with result count
- Case-insensitive matching

### Filtering Options
- **Palveluntarjoaja**: Filter by healthcare provider
- **Saatavuus**: Filter by availability
- **Erikoisala**: Filter by medical specialty
- **Kielet**: Filter by spoken languages

### Booking Flow
- Click "Varaa aika" on any doctor card
- Modal shows booking confirmation
- Demo disclaimer explains this redirects to provider's actual booking system
- In production, would redirect to the respective provider's booking URL

## Mobile Optimization

- Responsive design works on all device sizes
- Touch-friendly interface
- Optimized loading with professional headshot images from Unsplash
- Smooth animations and transitions

## Demo Note

This is a demo application. In production, the "Varaa aika" button would redirect to the actual booking systems of each healthcare provider (Mehiläinen, Terveystalo, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details