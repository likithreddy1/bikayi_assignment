import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./Tablelist";
import "./App.css";
function App() {
  const years = [
    1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1912,
    1911, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923,
    1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935,
    1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947,
    1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959,
    1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971,
    1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983,
    1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
    1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
  ];
  const [selectes, setSelects] = useState({
    category: "",
    year: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [state, setState] = useState(true);

//handling the value change of selects

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSelects((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  console.log(selectes);
  const [data, setData] = useState([]);

  //fetching the data from the api using axios

  let url = "http://api.nobelprize.org/v1/prize.json";
  const fetchdata = async () => {
    await axios
      .get(url)
      .then((res) => setData(res.data.prizes))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(data);
  const filterd = [];
  const filter = () => {
    if (data) {
      data.map((item) => {
        if (
          item.category === selectes.category &&
          item.year === selectes.year
        ) {
          filterd.push(item);
        }
      });
    }
  };
  filter();
  console.log(filterd);

  function handleState() {
    if (selectes.category !== "" && filterd.length > 0) {
      setState(false);
      setFilteredData(filterd);
    }
  }
  return (
    <div className="App">
      <select
        className=" form-select-lg m-3  "
        id="form_select"
        aria-label=".form-select example"
        name="category"
        onChange={handleChange}
      >
        <option selected value="">
          Select Category
        </option>
        <option value="chemistry">Chemistry</option>
        <option value="physics">Physics</option>
        <option value="economics">Economics</option>
        <option value="peace">Peace</option>
        <option value="literature">Literature</option>
        <option value="medicine">Medicine</option>
      </select>
      <select
        className=" form-select-lg m-3"
        id="form_select"
        aria-label=".form-select example"
        onChange={handleChange}
        name="year"
      >
        <option selected value="">
          Select Year
        </option>
        {years.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <button className="btn btn-success" onClick={() => handleState()}>
        Fetch Data
      </button>
      <div>
        <table class="table">
          <thead></thead>
        </table>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">FirstName</th>
            <th scope="col">SurName</th>
            <th scope="col">Motivation</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {state ? (
            data.map((item) => {
              if (item["laureates"]) {
                  return (
                    //when prize is won on particular date and category
                    <tr>
                      <td>{item.laureates[0].id}</td>
                      <td>{item.laureates[0].firstname}</td>
                      <td>{item.laureates[0].surname}</td>
                      <td>{item.laureates[0].motivation}</td>
                      <td>{item.laureates[0].share}</td>
                    </tr>
                  );
              } else {
                // if no one won the prize on particular category and year
                return (
                  <tr>
                    <td>{"-"}</td>
                    <td>{"-"}</td>
                    <td>{"-"}</td>
                    <td>{"- NO ONE WON "}</td>
                    <td>{"-"}</td>
                  </tr>
                );
              }
            })
          ) : (
            <List filterd={filteredData}></List>
          )}
          {/*   */}
        </tbody>
      </table>
    </div>
  );
}

export default App;
