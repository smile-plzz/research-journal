# 🗞️ DailyDigest - Enhanced News Application

A modern, feature-rich news application built with React that provides real-time news from multiple sources with an intuitive and beautiful user interface.

## ✨ Features

### 🎨 **Enhanced UI/UX**
- **Modern Design**: Clean, minimalist interface with smooth animations
- **Responsive Layout**: Optimized for all device sizes (mobile, tablet, desktop)
- **Dark Mode**: Beautiful dark theme with system preference detection
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Typography**: Modern Inter font with proper hierarchy

### 🔍 **Advanced Search & Filtering**
- **Real-time Search**: Instant search across all news sources
- **Quick Presets**: Pre-configured filters for common use cases
- **Collapsible Filters**: Advanced filtering options that can be hidden/shown
- **Multiple News Sources**: Support for GNews, TheNewsAPI, and NewsAPI
- **Date Range Filtering**: Filter news by specific date ranges
- **Country & Language Selection**: Localized news content

### 📱 **Improved User Experience**
- **Bookmark System**: Save articles for later reading
- **Reading Time Estimation**: Know how long articles take to read
- **Enhanced Sharing**: Native sharing with fallback to clipboard
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: Comprehensive error messages with solutions

### 🚀 **Performance & Accessibility**
- **Lazy Loading**: Images load only when needed
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion Support**: Respects user motion preferences
- **High Contrast Mode**: Accessibility for users with visual impairments
- **Responsive Images**: Optimized image loading and display

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Bootstrap Icons
- **Date Handling**: date-fns
- **State Management**: React Context + Custom Hooks
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd News
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GNEWS_TOKEN=your_gnews_api_key
   VITE_NEWSAPI_KEY=your_newsapi_key
   VITE_THENEWSAPI_TOKEN=your_thenewsapi_token
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Keys
The application supports multiple news APIs:

- **GNews API**: Free tier available, good for general news
- **NewsAPI**: Free tier available, comprehensive coverage
- **TheNewsAPI**: Free tier available, international news

### Customization
- Modify color schemes in `src/index.css`
- Adjust animations in `src/App.css`
- Update news sources in `api/get-news.js`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 576px
- **Tablet**: 576px - 991px  
- **Desktop**: ≥ 992px

## 🎯 Key Components

### Core Components
- **Layout**: Main application structure
- **Navbar**: Navigation with search and dark mode toggle
- **Filters**: Advanced filtering and quick presets
- **NewsList**: Article grid with responsive layout
- **Article**: Individual article cards with enhanced features

### Enhanced Features
- **Quick Presets**: Breaking News, Tech Updates, Business Daily, etc.
- **Smart Search**: Real-time search with clear functionality
- **Bookmark System**: Save and manage favorite articles
- **Reading Time**: Estimated reading duration for each article
- **Enhanced Sharing**: Multiple sharing options

## 🌙 Dark Mode

The application features a sophisticated dark mode system:
- **Automatic Detection**: Follows system color scheme preference
- **Manual Toggle**: User can override system preference
- **Persistent**: Remembers user choice across sessions
- **Optimized Colors**: Carefully selected colors for both themes

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant color schemes
- **Reduced Motion**: Respects user motion preferences

## 📊 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Efficient Rendering**: Optimized React components
- **Minimal Re-renders**: Smart state management
- **Bundle Optimization**: Tree-shaking and code splitting

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🔄 Recent Improvements

### UI/UX Enhancements
- ✅ Modern card design with hover effects
- ✅ Improved typography and spacing
- ✅ Enhanced color schemes and gradients
- ✅ Smooth animations and transitions
- ✅ Better mobile responsiveness

### Functionality Improvements
- ✅ Quick filter presets
- ✅ Collapsible advanced filters
- ✅ Enhanced search with clear button
- ✅ Bookmark functionality
- ✅ Reading time estimation
- ✅ Better error handling

### Performance & Accessibility
- ✅ Lazy image loading
- ✅ Improved keyboard navigation
- ✅ Better screen reader support
- ✅ Reduced motion support
- ✅ High contrast mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Bootstrap**: For the responsive framework
- **Bootstrap Icons**: For the beautiful icon set
- **date-fns**: For date manipulation utilities
- **React Team**: For the amazing framework

## 📞 Support

If you encounter any issues or have questions:
- Check the [Issues](../../issues) page
- Create a new issue with detailed information
- Contact the development team

---

**Made with ❤️ by the DailyDigest Team**