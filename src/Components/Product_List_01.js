import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, TextField, InputAdornment } from "@mui/material";
import ReactPaginate from "react-paginate";
import "./ProductList.css"; // Import your CSS styles
// for responsive website
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// for icon
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductList_01() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const [searchResultCount, setSearchResultCount] = useState(0); // New state variable

  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
      console.log("responce", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("dataaaaaaaa", data);

  useEffect(() => {
    fetchProduct();
    setSearchResultCount(
      data.filter((item) =>
        Object.values(item)
          .map((value) => String(value).toLowerCase())
          .join(" ")
          .includes(searchTerm.toLowerCase())
      ).length
    );
  }, [data, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter((item) =>
    Object.values(item)
      .map((value) => String(value).toLowerCase())
      .join(" ")
      .includes(searchTerm.toLowerCase())
  );

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container">
      <div
        className="page-container"
        style={{
          padding: "20px",
          background:
            "linear-gradient(153deg, rgba(27,186,247,0.947391456582633) 22%, rgba(15,31,98,1) 57%)",
        }}
      >
        <Paper elevation={3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "40vh",
              background:
                "url(https://cdn.pixabay.com/photo/2018/03/01/14/48/woman-3190829_1280.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 110%",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Search Products"
              // helperText={'Search results:'+{searchResultCount}}
              InputProps={{
                style: {
                  borderRadius: 40,
                  borderColor: "white",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              style={{
                marginLeft: "2%",
                // background:
                //   "linear-gradient(90deg, rgba(63,251,246,0.5328256302521008) 22%, rgba(70,252,192,0.5832457983193278) 81%)",
                background: "white",
                width: matches ? "90%" : "40%",
                borderRadius: 70,
                border: 0,
              }}
            />

            <p style={{ color: "white", fontFamily: "sans-serif" }}>
              Search results: <b>{searchResultCount}</b>
            </p>
            {/* Display the count */}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th id="hiddenText">Title</th>
                <th id="hiddenText">Price($)</th>
                <th id="hiddenText">Category</th>
                <th id="hiddenText">Image</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((rowData) => (
                <tr
                  key={rowData.id}
                  style={{
                    display: matches ? "flex" : "",
                    flexDirection: matches ? "column-reverse" : "row",
                    alignItems: matches ? "center" : "",
                    justifyContent: matches ? "center" : "",
                  }}
                >
                  <td>
                    <b style={{ fontFamily: "sans-serif" }}>{rowData.title}</b>
                    <br></br>
                    <p
                      style={{
                        lineHeight: 1.4,
                        color: "gray",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {rowData.description}
                    </p>
                  </td>
                  <td id="font">($){rowData.price}</td>
                  <td>
                    <i>{rowData.category}</i>
                  </td>
                  <td className="avatar">
                    <img
                      style={{ marginTop: "4%" }}
                      src={rowData.image}
                      alt={rowData.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={<ArrowBackIosIcon />}
              nextLabel={<ArrowForwardIosIcon />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination-container"}
              subContainerClassName={"pagination-subcontainer"}
              activeClassName={"active"}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
}
