import MaterialTable from "@material-table/core";
import { Box, Avatar,Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Product_List() {

  const [Data, setData] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data); // Set data to the response data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
 
  return (
    <Box>
         <Box>
      <Paper elevation={3} style={{ padding: "20px", margin: "20px",background:'linear-gradient(153deg, rgba(27,186,247,0.947391456582633) 22%, rgba(15,31,98,1) 57%)' }}>
        <MaterialTable
          title="Products"
          columns={[
            { title: "Title", field: "title", cellStyle: { fontWeight: 600, fontSize: "1.2em", fontFamily: "Arial, sans-serif" } },
            { title: "Price ($)", field: "price", type: "currency", cellStyle: { fontSize: "1.1em", fontFamily: "Verdana, sans-serif" } },
            {
              title: "Category",
              field: "category",
              cellStyle: { fontStyle: "italic", fontSize: "1em", fontFamily: "Georgia, serif" },
            },
            {
              title: "Image",
              render: (rowData) => (
                <Avatar
                  alt={rowData.title}
                  src={rowData.image}
                  sx={{ width: 115, height: 115 }}
                 
                />
              ),
            },
          ]}
          data={Data}
          options={{
            filtering: true,
            headerStyle: { background: "#f1f1f1" },
          }}
        
        />
      </Paper>
    </Box>
    </Box>
  );
}
