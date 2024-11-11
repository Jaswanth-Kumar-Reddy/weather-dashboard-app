# weather-dashboard-app

This is a weather dashboard application built using React and Next.js. It allows users to check weather data for different cities, including current weather details and forecasts.

## Setup Instructions

To set up the project on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Jaswanth-Kumar-Reddy/weather-dashboard-app.git
    cd weather-dashboard-app
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions Made

- The application assumes the user has an internet connection to fetch weather data via the API.
- The user has basic knowledge of React and Next.js for running and making further modifications to the application.
- The weather API used is available and functioning correctly.

## Trade-offs Considered

- **API Choice**: We chose a weather API that provides sufficient data for our needs (temperature, weather conditions, etc.). There are more comprehensive APIs available, but this one strikes a good balance between ease of use and data richness.
- **Performance vs Features**: The app focuses on providing a responsive UI with essential weather information rather than loading every single detail. More advanced data could be added in the future for more detailed insights.

## List of Implemented Features

- Fetch current weather data based on user input (city name).
- Display weather information such as temperature, humidity, and conditions.
- Display an error message when the city is not found.
- User-friendly UI with basic styling for easy readability.
- Responsive design for mobile and desktop views.

## Future Improvements

- **Multiple Cities**: Allow the user to check the weather for multiple cities at once.
- **Advanced Features**: Add a 7-day weather forecast, hourly weather updates, and charts/graphs for temperature trends.
- **Performance Enhancements**: Use caching to minimize repeated API requests and improve loading times.
- **Unit Conversion**: Allow users to switch between Celsius, Fahrenheit, and Kelvin.
- **Deploy to Production**: Deploy the app to a cloud platform like Vercel or Netlify for public access.

## Screen Recorded 60 Sec Video

You can view the screen recording of the app [here](https://drive.google.com/file/d/1jIakLk5QVt_EVcn5XP4fb0ORflQ8k3TA/view?usp=share_link).

## Deploy the Application (Optional)

For easy deployment, you can use [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/):

1. Push your code to GitHub (as shown in the steps above).
2. Sign up for an account on Vercel/Netlify and link your GitHub repository.
3. Follow the instructions to deploy the app.

For more information, refer to the [Vercel Deployment Docs](https://vercel.com/docs).

---

Feel free to contribute to this project by submitting pull requests or reporting issues!


