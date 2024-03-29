//?=== IMPORT CSS FILE ===?//
import Layout from "../../layout";
import "./index.css";
import { INewProducts, ICategory } from "../../interface";
import { Newsletter } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategorys, getProducts } from "../../api/api";
import { BASE_URL } from "../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProductPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search).get("category");
  const [items, setItems] = useState<INewProducts[]>([]);
  const [filtered, setFiltered] = useState<ICategory[]>([]);
  const [active, setActive] = useState("Все");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoad, setIsFilterLoad] = useState(true);

  useEffect(() => {
    setIsFilterLoad(true);
    (async () => {
      const { data, success } = await getProducts({
        category_id: params as string,
      });
      if (success) {
        setIsFilterLoad(false);
        setItems(data);
      }
    })();
  }, [params]);

  useEffect(() => {
    setIsFilterLoad(true);
    setIsLoading(true);
    (async () => {
      const { data, success } = await getCategorys();
      if (success) {
        setFiltered(data);
        setIsFilterLoad(false);
        const c = data.filter((c: ICategory) => c.id === +params!);
        params ? setActive(c[0].title) : setActive("Все");
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <Layout>
      <div className="container">
        <div style={{ marginBlock: "15vh" }} className="category_products">
          <section>
            {isLoading ? (
              <div
                style={{
                  height: "50vh",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <div
                  className="spinner-border text-success"
                  role="status"
                ></div>
              </div>
            ) : (
              <>
                <h3>Отфильтровано по:</h3>
                <ul>
                  <li
                    onClick={() => {
                      setActive("Все");
                      navigate(`/products`);
                    }}
                    style={{
                      whiteSpace: "nowrap",
                      background: active === "Все" ? "var(--light__green)" : "",
                      color: active === "Все" ? "#fff" : "",
                      opacity: active === "Все" ? "1" : "",
                      fontWeight: active === "Все" ? "500" : "normal",
                    }}
                  >
                    Все категории
                  </li>
                  {filtered.map((item: ICategory) => (
                    <li
                      onClick={() => {
                        setActive(item.title);
                        navigate(`/products?category=${item.id}`);
                      }}
                      style={{
                        whiteSpace: "nowrap",
                        color: active === item.title ? "#fff" : "",
                        opacity: active === item.title ? "1" : "",
                        fontWeight: active === item.title ? "500" : "normal",
                        background:
                          active === item.title ? "var(--light__green)" : "",
                      }}
                      key={item.id}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
                <div className="filtered_products">
                  {isFilterLoad ? (
                    <div
                      style={{
                        height: "50vh",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <div
                        className="spinner-border text-success"
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <>
                      {" "}
                      {items.map((item: INewProducts, i: number) => (
                        <Link
                          key={i}
                          to={`/products/${item.id}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          <div className="box_products">
                            <LazyLoadImage
                              src={`${BASE_URL}${item.product_images[0]?.image}`}
                              alt="Image"
                              effect="blur"
                            />
                            <div
                              className="card_desc"
                              style={{
                                padding: "32px 22px 30px",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                height: "60%",
                              }}
                            >
                              <div>
                                <h3
                                  style={{
                                    marginBlock: "20px",
                                    fontSize: "20px",
                                    lineHeight: "24px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {item.title}
                                </h3>
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "22px",
                                    marginBottom: "1rem",
                                    color: "#164234",
                                  }}
                                >
                                  {item.description.slice(0, 150)}
                                </p>
                              </div>
                              <button
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  textTransform: "uppercase",
                                  lineHeight: "123%",
                                  letterSpacing: "2px",
                                  color: "#69c04b",
                                  marginTop: "30px",
                                }}
                              >
                                Подробнее
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
        <Newsletter />
      </div>
    </Layout>
  );
}
