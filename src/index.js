import { ConfigProvider } from "antd"
import vnVN from "antd/lib/locale/vi_VN"
import AOS from "aos"
import "aos/dist/aos.css"
import "moment/locale/vi"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import "src/assets/scss/index.scss"
import StoreProvider from "src/lib/store"
import store from "src/redux/store"
import { ThemeProvider } from "styled-components"
import App from "./App"
import ErrorBoundary from "./components/Boundary"
import "./index.css"
import { initFacebookSdk } from "./lib/init-fb-sdk"
import reportWebVitals from "./reportWebVitals"
import { theme } from "./theme"
const root = ReactDOM.createRoot(document.getElementById("root"))
AOS.init({ duration: 1000 })

const startApp = () => {
  root.render(
    <BrowserRouter>
      <ThemeProvider theme={{ ...theme }}>
        <ConfigProvider locale={vnVN}>
          <Provider store={store}>
            <StoreProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </StoreProvider>
          </Provider>
        </ConfigProvider>
      </ThemeProvider>
    </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById("root"),
  )
}

initFacebookSdk().then(startApp)

reportWebVitals()
