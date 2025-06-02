# 🗺️ DIGIPIN Interactive Map - Digital Postal Index Number Generator

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://digipin.maplabs.tec)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![OpenLayers](https://img.shields.io/badge/OpenLayers-Latest-blue)](https://openlayers.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**Interactive web application for generating DIGIPIN (Digital Postal Index Number) codes for any location in India using an OpenLayers-powered map interface.**

DIGIPIN is India's revolutionary geo-coded addressing system developed by **India Post** in collaboration with **IIT Hyderabad**. This tool provides precise 10-digit alphanumeric codes based on a 4m x 4m geographical grid system for accurate location addressing and delivery services.

## 🌟 Features

- **🗺️ Interactive Map Interface** - Click anywhere on the map to generate DIGIPIN codes
- **🔍 Address Search** - Search by location name, address, or coordinates  
- **📋 One-Click Copy** - Copy DIGIPIN codes to clipboard instantly
- **🌓 Dark/Light Theme** - Automatic theme switching with system preference
- **📱 Mobile Responsive** - Optimized for all device sizes
- **🎯 Boundary Visualization** - See precise 4m x 4m grid areas with polygon overlays
- **⚡ Real-time Generation** - Instant DIGIPIN code generation
- **🔄 Bidirectional Conversion** - Convert between coordinates and DIGIPIN codes

## 🚀 Live Demo

**[🌐 Try DIGIPIN Generator](https://digipin.maplabs.tec)**

## 📖 About DIGIPIN

DIGIPIN (Digital Postal Index Number) is a standardized geo-coded addressing system that:

- Divides India's geographical territory into uniform **4m × 4m grid units**
- Assigns each unit a unique **10-digit alphanumeric code** 
- Derives codes from precise latitude and longitude coordinates
- Enhances delivery accuracy and emergency response times
- Supports India's digital transformation in logistics and governance

**Developed by:** India Post & IIT Hyderabad  
**Coverage:** All of India  
**Precision:** 4-meter accuracy  
**Format:** 10-digit alphanumeric code

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/ronitjadhav/digipin-openlayers.git
    cd digipin-openlayers
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Mapbox public token and map style URLs:

    ```dotenv
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiZXhhbXBsW12tlbiJ9.exampletoken
    NEXT_PUBLIC_MAPBOX_LIGHT_STYLE_URL=mapbox://styles/mapbox/light-v10
   NEXT_PUBLIC_MAPBOX_DARK_STYLE_URL=mapbox://styles/mapbox/dark-v10
    ```

4. Start the development server:

    ```sh
    npm run dev
    ```

5. Open the application in your browser:

    ```sh
    http://localhost:3000
    ```

## Usage

Once the application is running, you can use it as follows:

1.	Open the application in your browser.
2. Click on the map to select a location.
3.	The respective DIGIPIN for the selected location will be displayed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue to discuss what you would like to change.

## Implementing DIGIPIN in Your Project

You can easily integrate DIGIPIN into your project by installing the DIGIPIN NPM package. 
This npm package allows you to convert latitude and longitude coordinates into a DIGIPIN code and vice versa.

To install the DIGIPIN package, run the following command:

```sh
npm install digipin
```

## Usage

### Importing the Functions

You can import the functions either as named imports or as a default import.

#### Named Imports

```typescript
import { getDIGIPINFromLatLon, getLatLonFromDIGIPIN } from 'digipin';

const digipin = getDIGIPINFromLatLon(12.34, 56.78);
console.log(digipin); // Outputs the corresponding DIGIPIN

const coordinates = getLatLonFromDIGIPIN('G4J-9K4-7L');
console.log(coordinates); // Outputs the corresponding latitude and longitude
```


#### Default Import

```typescript
import digipin from 'digipin';

const digipinCode = digipin.getDIGIPINFromLatLon(12.34, 56.78);
console.log(digipinCode); // Outputs the corresponding DIGIPIN

const coordinates = digipin.getLatLonFromDIGIPIN('G4J-9K4-7L');
console.log(coordinates); // Outputs the corresponding latitude and longitude
```
