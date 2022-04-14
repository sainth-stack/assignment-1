import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import AllOrders from './AllOrders/index'
export const productsGenerator = (products, quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      id: i + 1,
      _id: products[i]._id,
      name: products[i].trainName,
      trainNum: products[i].trainNum,
    });
  }
  return items;
};

export default function Dashboard() {
  const [, setCustomers] = useState([]);
  const [enrollsCount, setEnrollsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productss, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [monthlyEnrolls, setMonthlyEnrolls] = useState({});
  const [updateObj, setUpdateObj] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const handleDelete = (row) => {
    let confirmm = window.confirm("Are you sure want to delete?");
    if (confirmm) {
      axios.delete(`http://localhost:5000/deletedata/${row._id}`).then((res) => {
       if(res){
         alert('Reservation Deleted Successfully')
         getAllUsersDatas();

       }
  }) 
}   
  };
  
  useEffect(() => {
    getAllUsersDatas();
    //eslint-disable-next-line
  }, []);
  const getAllUsersDatas = () => {
    setLoading(true);
   axios.get("http://localhost:5000/getdata").then((res) => {
        const products = productsGenerator(res.data, res.data.length);
        console.log(products)
        setProducts(products);
  })
}
  // const handleEdit = (cellContent) => {
  //   const updateOb = {
  //     userid: cellContent.userId,
  //     username: cellContent.name,
  //     useremail: cellContent.useremail,
  //     accountStatus: cellContent.accountStatus,
  //   };
  //   setUpdateObj(updateOb);
  //   return updateOb;
  // };
  const columns = [
    {
      dataField: "id",
      text: "S.No",
      sort: true,
    },
    {
      dataField: "name",
      text: "Train Name",
      sort: true,
    },
    {
      dataField: "trainNum",
      text: "Train Number",
      sort: true,
    },

    {
      formatter: (cellContent, row) => {
        return (
          <div className="d-flex flex-wrap">
            <button
              className="btn btn-danger btn-xs"
              title="Delete"
              onClick={() => handleDelete(row)}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        );
      },
    },
  ];


  return (
    <div>
      <div className="d-flex bg-primary rounded text-white align-items-center flex-wrap">
        <h1 className="container-fluid col-lg-9 col-md-12 col-sm-12 col-xs-12 m-0">
          Dashboard{" "}
          <button
            className="btn btn-primary"
            // onClick={() => getAllUsersDatas()}
          >
            <i className="fa fa-rotate-right" /> &nbsp; Refresh Data
          </button>
        </h1>

        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 text-center">
          <h4>Today</h4>
          <h5>{moment(new Date()).format("DD MMMM YYYY hh:mm:ss A")}</h5>
        </div>
      </div>
      {!loading ? (
        <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
          <div
            className="card col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-info text-white text-center"
            style={{ height: 100 }}
          >
            <h4>Total Journeys</h4>
            {/* <Counter end={usersCount} /> */}
            20
          </div>
          <div
            className="card col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-warning text-white text-center"
            style={{ height: 100 }}
          >
            <h4>Total Reservations</h4>
            {/* <Counter end={enrollsCount} /> */}
            250
          </div>
          <div
            className="card col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-info text-white text-center"
            style={{ height: 100 }}
          >
            <h4>Active Reservations</h4>
            {/* <Counter end={activeUsers} /> */}
            200
          </div>
          <div
            className="card col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-success text-white text-center"
            style={{ height: 100 }}
          >
            <h3>Total Amount</h3>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="d-flex align-items-center justify-content-center">
                <span>₹</span>
                {/* <Counter end={totalAmount} /> */}
                2000
                /-
              </h4>
              {/* &nbsp;&nbsp; - &nbsp;&nbsp;
              <h4 className="d-flex align-items-center justify-content-center">
                <span>$</span>
                {totalAmount > 0 && <Counter end={totalAmount / 74} />}
              </h4> */}
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
      {loading ? (
        <div>
          <div className="d-block form-group">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="form-control"
              placeholder="Search Reservation"
            />
          </div>

          <div>
           
          </div>
          <h1>
            All Reservations{" "}
            {searchKey.length > 0 && (
              <small>
                (Search results found:{" "}
                {
                  productss.filter((item) => {
                    return (
                      item.name
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) !== -1
                    );
                  }).length
                }
                )
              </small>
            )}
          </h1>
          <div id="modal"></div>
          <AllOrders
            productss={productss.filter((item) => {
              return (
                item.name.toLowerCase().indexOf(searchKey.toLowerCase()) !==
                -1 );
            })}
            columns={columns}
            paginationFactory={paginationFactory}
            searchKey={searchKey}
          />
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
      {/*<input type="date" title="Select Year" />*/}
      {/*<Line data={data} options={options} height={100} />*/}
    </div>
  );
}
