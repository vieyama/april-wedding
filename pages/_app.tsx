import { useEffect } from "react";
import AOS from "aos";
import "styles/style.sass";
import "styles/variables.less";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    AOS.init({
      once: true,
      delay: 100,
    });
  });

  return <Component {...pageProps} />;
}

export default MyApp;
