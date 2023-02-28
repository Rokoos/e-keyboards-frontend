import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  getCategoryProducts,
  getCategoryProductsCount,
} from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import Spinner from "../Spinner";
import { Pagination } from "antd";

const CategoryHome = ({ match }) => {
  let history = useHistory();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const slug = match.params.slug;

  const loadCategoryProducts = useCallback(() => {
    setLoading(true);
    getCategoryProducts(slug, "createdAt", "desc", page).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [page, slug]);

  useEffect(() => {
    loadCategoryProducts();
  }, [page, loadCategoryProducts]);

  useEffect(() => {
    getCategoryProductsCount(slug).then((res) => {
      let filteredProducts = res.data.filter((p) => p.category.slug === slug);
      setProductsCount(filteredProducts.length);
    });
  }, [slug]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h4 className="text-center display-4 checkout_margin border-top  border-bottom p-5">
            {` ${category.name}`}
          </h4>
          {products.length === 0 && (
            <div
              className=" mx-auto d-flex flex-column align-items-center"
              style={{ width: "40%" }}
            >
              <h5 className="text-center mt-3 mb-5  ">
                No products in this category
              </h5>
              <div
                onClick={() => history.push("/")}
                className="btn unique"
                style={{ width: "100px" }}
              >
                {" "}
                Home
              </div>
            </div>
          )}

          <div className="container mb-5 mt-5 ginek">
            <div className="row heniek">
              {products.map((product) => (
                <div
                  className="col-md-4 d-flex align-items-stretch"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {products.length > 1 && (
            <div className="row category_margin">
              <div className="col-md-4 offset-md-4 text-center ">
                <Pagination
                  current={page}
                  total={(productsCount / 3) * 10}
                  onChange={(value) => setPage(value)}
                />
              </div>
              <div className="losFooteros"></div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CategoryHome;
