# Medicine Tracker - Smart Medication Management

A comprehensive, user-friendly web application designed to help individuals manage their daily medication schedules with advanced features like reminders, tracking, and intelligent notifications.

## ✨ New Features in v2.0

### 🎯 Enhanced User Experience
- **Modern Dashboard**: Real-time statistics showing total medicines, today's doses, adherence rate, and next dose time
- **Improved UI/UX**: Beautiful gradient backgrounds, card hover effects, and smooth animations
- **Responsive Design**: Optimized for all devices with better mobile experience
- **Smart Notifications**: Browser notifications for medication reminders
- **Search & Filter**: Find medicines quickly and filter by time periods

### 📊 Advanced Tracking
- **Medication History**: Track all changes and actions taken
- **Adherence Monitoring**: Real-time adherence rate calculation
- **Dose Status**: Visual indicators for taken, pending, and overdue doses
- **Export Functionality**: Export data as JSON for backup or sharing

### 🔔 Smart Reminders
- **Customizable Reminders**: Set reminder times (5, 10, 15, 30 minutes before)
- **Browser Notifications**: Get notified when it's time to take medicine
- **Settings Management**: Configure notification preferences
- **Auto-save**: Automatic data saving with configurable options

### 🎨 Visual Improvements
- **Stats Dashboard**: Four key metrics displayed prominently
- **Status Indicators**: Color-coded status for each dose
- **Better Icons**: Updated Font Awesome icons throughout
- **Improved Layout**: Two-column layout for better organization
- **Enhanced Tables**: Better responsive table design

## 🚀 Core Features

### Medicine Management
- **Smart Input**: Autocomplete-enabled medicine name input with RxNav API integration
- **Multiple Times**: Add multiple daily times for each medicine
- **Detailed Information**: Dosage, instructions, duration, and custom notes
- **Edit & Delete**: Full CRUD operations for medicine management
- **Medicine Information**: Automatic fetching of drug details from RxNav API

### Schedule Management
- **Dynamic Schedule**: Real-time schedule updates with sorting by time
- **Visual Status**: Clear indicators for dose status (taken, pending, overdue)
- **Quick Actions**: Mark doses as taken with one click
- **Search & Filter**: Find medicines and filter by time periods

### Data Persistence
- **Local Storage**: All data stored securely in browser's localStorage
- **Auto-save**: Automatic saving of all changes
- **Data Export**: Export all data as JSON file
- **Data Import**: Import previously exported data

### PDF Generation
- **Professional Layout**: Clean, printable PDF schedules
- **Patient Information**: Include patient and doctor details
- **Comprehensive Data**: All medicine details, times, and instructions
- **Custom Styling**: Professional formatting with proper headers and footers

## 🛠️ Technical Features

### API Integration
- **RxNav API**: Real-time medicine information and autocomplete
- **Error Handling**: Graceful handling of API failures
- **Fallback Support**: Works offline with basic functionality

### Performance
- **Debounced Search**: Efficient autocomplete with 300ms delay
- **Optimized Rendering**: Smooth updates without page refreshes
- **Memory Management**: Automatic cleanup of old history entries

### Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with screen readers
- **High Contrast**: Good color contrast ratios

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop**: Full-featured experience with side-by-side layout
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Stacked layout with mobile-optimized tables

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project:**
   ```bash
   cd medicine-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:1234` (or the URL shown in terminal)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## 📖 Usage Guide

### Adding Medicines
1. Fill in the medicine name (with autocomplete suggestions)
2. Set the time(s) for daily doses
3. Add dosage and instructions (optional)
4. Set reminder preferences
5. Click "Add Medicine"

### Managing Your Schedule
- **View Schedule**: See all medicines organized by time
- **Mark as Taken**: Click the "Taken" button to record doses
- **Edit Medicine**: Click "Edit" to modify medicine details
- **Delete Medicine**: Remove medicines you no longer need

### Using Search & Filter
- **Search**: Type in the search box to find specific medicines
- **Filter by Time**: Use the dropdown to filter by morning, afternoon, evening, or night

### Exporting Data
- **Export**: Click "Export" to download all data as JSON
- **PDF**: Click "PDF" to generate a printable schedule
- **Backup**: Use exports to backup your data

### Settings
- **Notifications**: Enable/disable browser notifications
- **Auto-save**: Toggle automatic data saving
- **Default Reminder**: Set default reminder time for new medicines

## 🔧 Configuration

### Browser Notifications
To enable notifications:
1. Click the "Settings" button
2. Check "Enable notifications"
3. Allow notifications when prompted by your browser

### Data Management
- All data is stored locally in your browser
- Use the export feature to backup your data
- Reset schedule to clear all data (with confirmation)

## 🏗️ Project Structure

```
medicine-tracker/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   └── main.js            # Main JavaScript application
├── package.json           # Project configuration
├── README.md             # This file
└── vercel.json           # Deployment configuration
```

## 🛡️ Privacy & Security

- **Local Storage**: All data is stored locally in your browser
- **No Server**: No data is sent to external servers (except RxNav API for medicine info)
- **Offline Capable**: Works without internet connection (basic features)
- **No Tracking**: No analytics or tracking scripts

## 🔄 Version History

### v2.0.0 (Current)
- ✨ Complete UI redesign with modern dashboard
- 🔔 Smart notification system
- 📊 Advanced tracking and statistics
- 🔍 Search and filter functionality
- 📱 Improved responsive design
- 📈 Medication history tracking
- ⚙️ Settings management
- 📤 Data export/import features

### v1.0.0
- Basic medicine management
- PDF generation
- RxNav API integration
- Local storage persistence

## 🤝 Contributing

This project is developed by Md. Ismail Hossain. For questions, feedback, or contributions:

- **Email**: ismailhossain013@gmail.com
- **Phone**: +88-01866304933

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

This application is designed to help manage medication schedules but should not replace professional medical advice. Always consult with healthcare professionals before making changes to your medication routine.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try clearing browser cache and localStorage
4. Contact the developer for assistance

---

**Made with ❤️ for better health management**
