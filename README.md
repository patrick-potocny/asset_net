
<a  href="https://patrick-potocny.github.io/asset_net">
<img  src="https://raw.githubusercontent.com/patrick-potocny/asset_net/master/public/static/android-chrome-256x256.png"  alt="AssetNet logo"  title="AssetNet"  align="right"  height="60"  />
</a>

# AssetNet 

<p align="center">Easily keep track of the prices of your favorite assets, like cryptocurrencies and stocks, with <a href="https://patrick-potocny.github.io/asset_net">AssetNet</a></p>

<p align="center">&#128073 <a href="https://patrick-potocny.github.io/asset_net">Live Site </a>&#128072</p>

---

## Table of contents 
1. [About AssetNet](#about-assetnet)
2. [Technologies used](#technologies-used)
3. [Design & Development](#design--development)
---

### About AssetNet
AssetNet is a web-app that provides users with the ability to effortlessly view and monitor the prices and fluctuations of their selected assets. The application's user-friendly interface allows users to customize their preferences, such as the displayed assets and appearance, and retain them for future use, providing a seamless experience upon each return visit. AssetNet was created to showcase my ability to design and create fully functional, responsive front-end applications using React. The motivation behind the creation of this project was to serve as a portfolio piece that demonstrates my proficiency in using React and ability to build user-friendly and visually pleasing applications.

![Demo](https://user-images.githubusercontent.com/67468836/213311405-fa774b5e-2315-4c54-8a1c-b03ae15f00cb.png)

---

### Technologies used
 - __HTML/CSS__
 - __JavaScript__
 - __SCSS__
 - __React__
 - __ChartJS__
 - __Webpack__
 - __ESLint__
 - __Jest__
 - __Git__
 - __Figma__

--- 

### Design & Development

To build the AssetNet app, I began by designing it in [Figma](https://www.figma.com/file/bduBS3l0oXvlhMIYq7rwqe/AssetNet-Website?node-id=0%3A1&t=f4jj5MHyVeNxdhTo-1), drawing inspiration from the simple and elegant style of iOS and utilizing my UI/UX design skills.

![Screenshot from 2023-01-19 11-15-55](https://user-images.githubusercontent.com/67468836/213416889-590bc1cd-8ab1-4f28-9ae5-6610f9a9c2b1.png)

Next, I sourced reliable and fast APIs for real-time and historical data of cryptocurrencies and stocks, ultimately selecting [Coinranking](https://developers.coinranking.com/api) for crypto data and [Alpha Vantage](https://www.alphavantage.co/) for stocks.

In determining the framework for building the React app, I carefully evaluated my options and ultimately chose [Create-React-App (CRA)](https://create-react-app.dev/) due to its ease of use and simplicity in getting the app up and running, as well as the app's lack of need for server-side rendering. To ensure a structured and maintainable CSS, I adopted the [BEM](https://getbem.com/) naming style and paired it with [SCSS](https://sass-lang.com/). To make the app user-friendly and facilitate easy storage of user preferences, I utilized the built-in localStorage API. To optimize performance, I implemented asynchronous JavaScript to make API requests simultaneously. To display historical data, I employed the [react-chartjs-2](https://react-chartjs-2.js.org/) library to provide visually pleasing and responsive components.

Throughout the development process, I adhered to best practices such as __TDD__ (Test-Driven Development) and __DRY__ (Don't Repeat Yourself). For testing, I utilized [Jest](https://jestjs.io/) in conjunction with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), and for version control, I employed [Git](https://git-scm.com/).


