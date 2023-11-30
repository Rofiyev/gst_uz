//?=== IMPORT HOME CSS FILE ===?//
import "./index.css";
import { useRef } from "react";
import Layout from "../../layout";
import home__image from "../../assets/home__image.jpg";
import { animated } from "react-spring";
import { use3dEffect } from "use-3d-effect";

export default function Home() {
  const ref = useRef<null>(null);
  const { style, ...mouseHandlers } = use3dEffect(ref);

  return (
    <Layout>
      <section id="home" className="home">
        <div className="home__main">
          <div className="info">
            <h1>Powerful Revenue Recognition Software</h1>
            <p>
              Gain confidence in your revenue so you can close the books 5X
              faster, maintain ASC 606 / IFRS 15 compliance, and deliver
              insights that drive growth.
            </p>
            <div className="btns__info">
              <button>Request a Demo</button>
              <button>Watch Video</button>
            </div>
          </div>
          <div className="images__wrapper">
            <animated.div
              ref={ref}
              style={{
                ...style,
              }}
              {...mouseHandlers}
            >
              <img src={home__image} alt="Certificate" />
            </animated.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
