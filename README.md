# Wildlife Field Notes

A mobile-friendly React app for logging animal sightings in the field. Built for ecology students and wildlife enthusiasts.

## Features

- Log animal sightings with name, species, date, notes, and weather
- Attach a photo to each sighting
- Record audio of animal calls and sounds (great for birds)
- Auto-grab your GPS location in the field
- View all sightings on an interactive map
- Mobile-first design for field use

## Tech Stack

- React + Vite
- React Router
- React-Leaflet + OpenStreetMap (maps, free, no API key)
- Browser Geolocation API (built-in, free)
- Mongodb for date storage
- UUID

## Getting Started

```bash
git clone https://github.com/yourusername/wildlife-field-notes.git
cd wildlife-field-notes
npm install
npm run dev
```

## Project Structure

```
src/
  components/    # Reusable UI components
  pages/         # Full page views
  utils/         # localStorage helpers
```

## Build Phases

- **Phase 1** — Core form, list, and detail views
- **Phase 2** — Photos, geolocation, and map view
- **Phase 3** — Polish, mobile styling, optional APIs

See `SPEC.md` for the full project specification.
