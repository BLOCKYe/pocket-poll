/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    main: '#282C34',
                    light: '#393E4B',
                    black: '#1C1E24',
                    shadow: '#575B67'
                },
                white: {
                    main: '#EEEEEE',
                    light: '#FFFFFF',
                    dark: '#D0D5D4'
                },
                color: {
                    main: '#FFD479'
                },
            },
        },
    },
    plugins: [],
}