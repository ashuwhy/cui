# will you be my girlfriend? 💝

<p align="center">
  <img src="https://media1.tenor.com/m/dob-xJHGr-EAAAAd/love-love-is-the-best-thing.gif" alt="love gif" width="300"/>
  <br/>
</p>

> "cui" is a playful abbreviation of "will you be my cutie? i love you!" 😗

A charming and interactive React Native application that creates a playful way to ask someone to be your girlfriend. Built with love and modern mobile development technologies.

## Features

### Interactive UI Elements
- Animated floating heart emoji
- Two response buttons: "yes" and "no"
- Playful interaction where the "no" button playfully dodges when pressed
- Beautiful rose decorations
- Custom fonts for a romantic aesthetic

### Background Music
- Built-in music player with pause/play functionality
- Romantic background track
- Elegant music control button

### Animations
- Pulsing heart animation
- Dynamic "no" button movement with spring physics
- Smooth scale and rotation effects
- Safe-area aware animations that keep elements on screen

## Technical Stack

- **Framework**: React Native 0.77.1
- **Language**: TypeScript
- **Audio**: react-native-track-player
- **Icons**: react-feather
- **Fonts**: 
  - Kugile Demo (for titles)
  - Atkinson (for buttons)
  - Noto Color Emoji (for emoji support)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run the application:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

## Project Structure

- `/assets`: Contains fonts, images, and audio files
- `/ios` & `/android`: Native platform configurations
- `App.tsx`: Main application component
- Custom fonts and emoji support configured for both platforms

## Customization

You can customize various aspects of the app:
- Background music: Replace `concert.wav` in the assets folder
- Colors: Modify the style constants in `App.tsx`
- Messages: Edit the alert text in the `onYesPress` function
- Animations: Adjust timing and spring configurations in animation functions

## Contributing

Feel free to contribute to this project by submitting pull requests or creating issues for bugs and feature requests.

## License

This project is open-source and available under the MIT License.

---
Copyright © 2025 Ashutosh Sharma

Made with ❤️ and React Native