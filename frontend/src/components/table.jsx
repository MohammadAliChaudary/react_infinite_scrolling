import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Data from "./data";
import DataTable from "./data";

const MyTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState();
  const observer = useRef();
  const [loading, setLoading] = useState(false);
  const [searchBar, setSearchBar] = useState("");

  const lastTableRow = useCallback((node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        pageNumber < totalPageNumber &&
        searchBar === ""
      ) {
        setPageNumber((prePageNumber) => prePageNumber + 1);
      }
    });

    if (node) observer.current.observe(node);
  });

  useEffect(() => {
    let delayDebounceFn;

    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/home?page=${pageNumber}&search=${searchBar}`
        );
        setTotalPageNumber(res.data.totalPageNumber);

        if (pageNumber === 1) {
          // console.log(res.data.data);
          setData(res.data.data);
        } else {
          setData((prev) => {
            const dataMap = new Map();
            prev.forEach((item) => dataMap.set(item.customer_id, item));
            res.data.data.forEach((item) =>
              dataMap.set(item.customer_id, item)
            );
            const combinedData = Array.from(dataMap.values());
            return combinedData;
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (searchBar !== "") {
      delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 500);
    } else {
      fetchData();
    }

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [pageNumber, searchBar]);

  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [searchBar]);

  // useEffect(() => {
  //   console.log(pageNumber);
  //   console.log(data);
  // });

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="p-5 col-8 bg-light">
        <div className="bg-white shadow border">
          <input
            type="search"
            name="search"
            id="search"
            className="form-control"
            autoComplete="off"
            onChange={(e) => setSearchBar(e.target.value)}
            value={searchBar}
          />
          <DataTable data={data} lastTableRow={lastTableRow} />
          {loading ? <tr>.....Loading</tr> : null}
        </div>
      </div>
    </div>
  );
};

export default MyTable;
