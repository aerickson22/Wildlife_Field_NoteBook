# Wildlife Field Notes — Project Spec

A mobile-friendly React web app for logging animal sightings in the field.
Built for ecology students and wildlife enthusiasts to track observations with photos, location, and notes.

---

## Goal

Build a personal wildlife journal where a user can:
- Log animal sightings quickly in the field
- Attach a photo, location, date, and notes to each entry
- Record audio of animal calls and sounds (especially useful for birds)
- Browse past sightings in a clean card layout
- View all sightings plotted on an interactive map

---

## Screens

### 1. Home (/)
- Header with app name and nav links
- Grid/list of all sighting cards
- Each card shows: photo thumbnail, animal name, date, location name
- Empty state message if no sightings yet
- Button to add a new sighting

### 2. Log Sighting (/log)
- Form with the following fields:
  - Animal name (text input, required)
  - Species (text input, optional)
  - Date & time (datetime-local input, defaults to now)
  - Location name (text input, e.g. "Hendricks County Forest")
  - Auto-grab location button (uses browser geolocation)
  - Photo upload (file input, image only)
  - Audio recording (record button / stop button / playback preview — uses MediaRecorder API)
  - Weather conditions (dropdown: Sunny / Cloudy / Rainy / Windy / Overcast)
  - Notes/observations (textarea)
- Save button → saves to localStorage → redirects to Home
- Cancel button → goes back

### 3. Sighting Detail (/sighting/:id)
- Full photo display
- Audio player if a recording exists (play/pause button)
- All sighting info displayed cleanly
- Animal name, species, date, location, weather, notes
- Small map showing the exact pin location
- Delete button with confirmation
- Back button

### 4. Map View (/map)
- Full screen interactive map (Leaflet + OpenStreetMap)
- Every sighting that has coordinates plotted as a pin
- Click a pin → popup shows animal name, date, thumbnail
- Click popup → goes to detail page

---

## Data Shape

Each sighting entry is stored a MongoDB as JSON:

```json
{
  "id": "uuid-here",
  "animalName": "Red Fox",
  "species": "Vulpes vulpes",
  "date": "2025-06-15T14:30",
  "locationName": "Hendricks County Forest",
  "lat": 41.8781,
  "lng": -87.6298,
  "photo": "base64string or null",
  "audio": "base64string or null",
  "weather": "Sunny",
  "notes": "Spotted near the creek, had two cubs with it."
}
```

---

## APIs & Libraries

| What | Tool | Cost | Key Needed? |
|------|------|------|-------------|
| Maps | Leaflet.js + React-Leaflet | Free | No |
| Map tiles | OpenStreetMap | Free | No |
| GPS location | Browser Geolocation API | Free | No (built-in) |
| Audio recording | MediaRecorder API | Free | No (built-in) |
| Weather (optional) | Open-Meteo | Free | No |
| Species info (optional) | iNaturalist API | Free | No |
| Unique IDs | uuid npm package | Free | No |

---

## 🧱 Build Order (Do This In Order)

### Phase 1 — Core (get this working first)
- [ ] Set up Vite + React project
- [ ] Install dependencies
- [ ] Set up React Router in App.jsx
- [ ] Build Navbar component
- [ ] Build storage.js utility functions
- [ ] Build LogSighting form (no photo, no location yet)
- [ ] Build Home page showing saved entries as cards
- [ ] Build Detail page

### Phase 2 — Features
- [ ] Add photo upload to form (convert to base64 for storage)
- [ ] Add audio recording to form (MediaRecorder API, save as base64)
- [ ] Add audio playback on detail page
- [ ] Add browser geolocation button
- [ ] Add Map View with Leaflet
- [ ] Add pins to map from saved sightings
- [ ] Add popup on pin click

### Phase 3 — Polish (only after Phase 1 & 2 are done)
- [ ] Mobile responsive styling
- [ ] Empty states (no sightings yet message)
- [ ] Delete confirmation dialog
- [ ] Optional: Open-Meteo weather auto-fill
- [ ] Optional: iNaturalist species lookup

---

## 🎨 Design Direction

- Clean, nature-inspired feel
- Green / earth tone color palette
- Mobile first — she'll use this in the field on her phone
- Cards with rounded corners, subtle shadows
- Big tap targets for field use with gloves on
