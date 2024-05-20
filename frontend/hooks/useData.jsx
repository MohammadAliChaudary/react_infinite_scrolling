import { useState, useEffect } from "react";
import axios from "axios";

const useData = ({ pageNumber }) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http:localhost:300/home?page=${pageNumber}`)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [pageNumber]);
  return data;
};

export default useData;
