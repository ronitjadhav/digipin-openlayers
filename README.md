# DIGIPIN OPENLAYERS

This application allows users to click on a map and get the respective DIGIPIN for the selected location. DIGIPIN is a geo-coded addressing system in India, providing a unique 10-digit alphanumeric code derived from latitude and longitude coordinates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Implementing DIGIPIN in Your Project](#implementing-digipin-in-your-project)
  
## Features

- Interactive map for selecting locations
- Generate DIGIPIN from latitude and longitude
- Convert DIGIPIN back to latitude and longitude
- Responsive design with dark mode support

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
