import { NextPage } from 'next';
import Head from 'next/head';

const About: NextPage = () => {
    return (
        <div
            className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.3] bg-dot-black/[0.3] bg-fixed flex flex-col items-center justify-center p-4">
            <Head>
                <title>About DIGIPIN</title>
            </Head>
            <div
                className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-7 mt-16 mb-8 lg:mt-28 lg:mb-16 justify-center">
                <div className="flex-1 p-4 sm:p-6 rounded-lg shadow-md bg-white dark:bg-zinc-800 lg:min-w-[600px]">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 dark:text-white">About
                        DIGIPIN</h1>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        The <strong>Department of Posts in India</strong> is advancing an initiative to establish a
                        standardized, geo-coded addressing system in India, ensuring simplified addressing solutions for
                        citizen-centric delivery of public and private services. This initiative is named the <strong>Digital
                        Postal Index Number (DIGIPIN)</strong>.
                    </p>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        The Department has collaborated with <strong>IIT Hyderabad</strong> to develop a National Level
                        Addressing Grid-based system. DIGIPIN divides India&apos;s geographical territory into uniform
                        4-meter by 4-meter units, assigning each a unique 10-digit alphanumeric code derived from the
                        latitude and longitude coordinates of the unit.
                    </p>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        This system will act as a strong and robust pillar of Geospatial Governance, enhancing public
                        service delivery, improving emergency response times, and significantly boosting logistics
                        efficiency. The advent of DIGIPIN marks a revolutionary step in India&apos;s digital
                        transformation
                        journey by bridging the gap between physical locations and their digital representation.
                    </p>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        The Department is releasing a beta version of the National Level Addressing Grid ‘DIGIPIN’ for
                        public feedback. Industry leaders, technical institutes, state and local governments, and the
                        public are encouraged to participate and provide their valuable input to fine-tune the
                        specifications of DIGIPIN.
                    </p>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        For more information, visit the <a
                        href="https://www.indiapost.gov.in/vas/Pages/digipin.aspx"
                        className="text-blue-600 dark:text-blue-400 hover:underline">India Post DIGIPIN page</a>.
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Credits</h2>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        The Digipin project is developed in collaboration with the Department of Posts and IIT
                        Hyderabad.
                    </p>
                    <hr className="my-4 border-gray-300 dark:border-gray-700"/>
                    <p className="text-sm sm:text-base dark:text-gray-500">
                        This application only provides a demo of the Digipin system and is not affiliated with the
                        Department of Posts or IIT Hyderabad.
                    </p>
                </div>

                <div className="flex-1 p-4 sm:p-6 rounded-lg shadow-md bg-white dark:bg-zinc-800 lg:min-w-[600px]">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 dark:text-white">Want to
                        Implement DIGIPIN in Your Project?</h2>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        You can easily integrate DIGIPIN into your project by installing the DIGIPIN NPM package.
                        This package allows you to convert latitude and longitude coordinates into a DIGIPIN code
                        and vice versa, making it a crucial tool for geospatial applications.
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Installation</h3>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded mb-6 overflow-auto">
                        <code
                            className="text-sm sm:text-base text-gray-900 dark:text-gray-300">npm install digipin</code>
                    </pre>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Usage</h3>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        To use the DIGIPIN NPM package, import the package and use the provided functions to convert
                        between latitude/longitude and DIGIPIN codes.
                    </p>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded mb-6 overflow-auto">
                        <code className="text-sm sm:text-base text-gray-900 dark:text-gray-300">
{`import digipin from 'digipin';

const lat = 28.6139;
const lon = 77.2090;

const digipinCode = digipin.getDIGIPINFromLatLon(lat, lon);
console.log(digipinCode); // Output: Example DIGIPIN code

const coordinates = digipin.getLatLonFromDIGIPIN(digipinCode);
console.log(coordinates); // Output: { latitude: 28.6139, longitude: 77.2090 }
`}
                        </code>
                    </pre>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">Contributing</h3>
                    <p className="text-base sm:text-lg mb-4 dark:text-gray-300">
                        Contributions are welcome! Please <a href="https://github.com/ronitjadhav/digipin-geocode"
                                                             className="text-blue-600 dark:text-blue-400 hover:underline"
                                                             target="_blank">fork the repository</a> and submit pull
                        requests. For major changes, please open an issue first
                        to discuss what you would like to change.
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 dark:text-white">License</h3>
                    <p className="text-base sm:text-lg dark:text-gray-300">
                        This project is licensed under the MIT License. See the <a
                        href="https://github.com/ronitjadhav/digipin-geocode/blob/main/LICENSE"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank">LICENSE</a> file for details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;