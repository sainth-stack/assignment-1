import {
  getAllEnrolls,
  getAllUsers,
  getAllUsersData,
  getAllActiveUsers,
  updateUserData,
} from "action/UserAct";
import Counter from "components/Counter";
import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import paginationFactory from "react-bootstrap-table2-paginator";
import { api, AuthToken, baseURL } from "utilities";
import { Toast } from "service/toast";
import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import AllOrders from "components/AllOrders";
import "react-linechart/dist/styles.css";
import { Bar } from "react-chartjs-2";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

export const productsGenerator = (products, quantity) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push({
      id: i + 1,
      _id: products[i]._id,
      name: products[i].name,
      email: products[i].email,
      coursename: products[i].coursename,
      certificateId: products[i].certificateId,
      registeredDate: products[i].registeredDate,
      amount: products[i].amount,
      userId: products[i].userId,
      useremail: products[i].useremail,
      accountStatus: products[i].accountStatus,
    });
  }
  return items;
};

function Dashboard({
  getAllUsersData,
  getAllEnrolls,
  getAllUsers,
  getAllActiveUsers,
  updateUserData,
}) {
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
  useEffect(() => {
    getAllUsersDatas();
    //eslint-disable-next-line
  }, []);
  const getAllUsersDatas = () => {
    setLoading(true);
    getAllEnrolls().then((enrolls) => {
      setEnrollsCount(enrolls.length);
      let courseCombos = [
        "JS and React",
        "JS and Node",
        "MERN Stack",
        "JS and MERN Stack",
        "YouTube Premium",
        "WEB DEVELOPMENT FULL COURSE",
      ];
      let filterPaid = enrolls.filter((item) => item.amount > 0);
      let filterCombos = filterPaid
        .filter((item) => courseCombos.includes(item.comboname))
        .sort((a, b) => {
          return a.amount < b.amount ? -1 : 1;
        });
      let filterNonCombos = filterPaid.filter(
        (item) => !courseCombos.includes(item.comboname)
      );
      let nonDuplicateCombos = filterCombos.filter(
        (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
      );
      let finalEnrolls = [...filterNonCombos, ...nonDuplicateCombos];
      let sum = finalEnrolls.reduce((prevValue, currentValue) => {
        return prevValue + parseInt(currentValue.amount);
      }, 0);
      setTotalAmount(sum - 201769);

      let vm = {};
      vm.jan = finalEnrolls.filter(
        (item) => /(.*)-01-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.feb = finalEnrolls.filter(
        (item) => /(.*)-02-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.mar = finalEnrolls.filter(
        (item) => /(.*)-03-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.apr = finalEnrolls.filter(
        (item) => /(.*)-04-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.may = finalEnrolls.filter(
        (item) => /(.*)-05-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.jun = finalEnrolls.filter(
        (item) => /(.*)-06-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.jul = finalEnrolls.filter(
        (item) => /(.*)-07-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.aug = finalEnrolls.filter(
        (item) => /(.*)-08-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.sep = finalEnrolls.filter(
        (item) => /(.*)-09-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.oct = finalEnrolls.filter(
        (item) => /(.*)-10-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.nov = finalEnrolls.filter(
        (item) => /(.*)-11-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      vm.dec = finalEnrolls.filter(
        (item) => /(.*)-12-(.*)/.test(item.registeredDate) && item.amount > 0
      );
      let totalAmount = [
        vm.jan,
        vm.feb,
        vm.mar,
        vm.apr,
        vm.may,
        vm.jun,
        vm.jul,
        vm.aug,
        vm.sep,
        vm.oct,
        vm.nov,
        vm.dec,
      ].map((month) => {
        let totalSum = month.reduce((prevValue, currentValue) => {
          return prevValue + parseInt(currentValue.amount);
        }, 0);
        return totalSum / 1000;
      });
      let totalCustomers = [
        vm.jan.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.feb.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.mar.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.apr.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.may.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.jun.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.jul.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.aug.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.sep.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.oct.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.nov.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
        vm.dec.filter(
          (v, i, a) => a.findIndex((t) => t.userId === v.userId) === i
        ),
      ].map((month) => {
        return month.reduce((prevValue) => {
          return prevValue + 1;
        }, 0);
      });
      let totalEnrolls = [
        vm.jan,
        vm.feb,
        vm.mar,
        vm.apr,
        vm.may,
        vm.jun,
        vm.jul,
        vm.aug,
        vm.sep,
        vm.oct,
        vm.nov,
        vm.dec,
      ].map((month) => {
        return month.reduce((prevValue) => {
          return prevValue + 1;
        }, 0);
      });
      let finalResult = {
        totalCustomers,
        totalEnrolls,
        totalAmount,
      };
      setMonthlyEnrolls(finalResult);
    });
    getAllUsers().then((users) => {
      setUsersCount(users.length - 2);
    });
    getAllActiveUsers().then((users) => {
      let activeData = users.filter(
        (user) => user.email !== "test500@mailinator.com"
      );
      setActiveUsers(activeData.length);
    });
    refreshUsers();
  };
  const refreshUsers = () => {
    getAllUsersData()
      .then((response) => {
        let data = response;
        let result = [];
        let i = 0;
        data.forEach((customer) => {
          customer.enrollDetails.forEach((enroll) => {
            let obj = { ...enroll };
            i++;
            obj.id = i;
            obj._id = enroll._id;
            obj.name = customer.name;
            obj.accountStatus = customer.accountStatus;
            obj.useremail = customer.email;
            obj.email =
              customer.email.length > 15
                ? customer.email.substring(0, 15) + "..."
                : customer.email;
            obj.registeredDate = moment
              .utc(enroll.registeredDate)
              .format("DD-MM-YYYY");
            if (
              (customer.enrollDetails.length === 3 &&
                parseInt(enroll.amount) === 4800) ||
              parseInt(enroll.amount) === 4000 ||
              parseInt(enroll.amount) === 1999
            ) {
              obj.amount = Math.floor(parseInt(enroll.amount) / 3).toFixed(0);
            } else if (
              (customer.enrollDetails.length === 2 &&
                parseInt(enroll.amount) === 3600) ||
              parseInt(enroll.amount) === 3350 ||
              parseInt(enroll.amount) === 3200
            ) {
              obj.amount = Math.floor(parseInt(enroll.amount) / 2).toFixed(0);
            }
            result.push(obj);
          });
        });
        //let sum = result.reduce((prevValue, currentValue) => {
        //  return prevValue + parseInt(currentValue.amount);
        //}, 0);
        //setTotalAmount(sum - (133999 + 81270 - 16390));
        setCustomers(result);
        const products = productsGenerator(result, result.length);
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleDelete = (row) => {
    let confirmm = window.confirm("Are you sure want to delete?");
    if (confirmm) {
      let deleteUser = api(baseURL + "/deleteEnroll/" + row._id, "DELETE", {
        "content-type": "application/json",
        Authorization: AuthToken,
      });
      deleteUser.then((res) => {
        if (res.success) {
          Toast({
            type: "success",
            message: "Successfully Deleted",
            time: 5000,
          });
          refreshUsers();
        } else {
          Toast({
            type: "danger",
            message: "Something Went Wrong",
            time: 5000,
          });
        }
      });
    }
  };
  const handleEdit = (cellContent) => {
    const updateOb = {
      userid: cellContent.userId,
      username: cellContent.name,
      useremail: cellContent.useremail,
      accountStatus: cellContent.accountStatus,
    };
    setUpdateObj(updateOb);
    return updateOb;
  };

  const handleCallback = (childData) => {
    updateUserData(childData.userid, {
      name: childData.name,
      email: childData.email,
      accountStatus: childData.status,
    })
      .then((res) => {
        if (res.success) {
          setModalShow(!modalShow);
          refreshUsers();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      dataField: "id",
      text: "S.No",
      sort: true,
    },
    {
      dataField: "name",
      text: "Customer Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Customer Email",
      sort: true,
    },
    // {
    //   dataField: "certificateId",
    //   text: "Certificate ID",
    //   sort: true,
    // },
    {
      dataField: "coursename",
      text: "Course",
      sort: true,
    },
    {
      dataField: "registeredDate",
      text: "Registered Date",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Paid Amount",
      sort: true,
    },
    {
      dataField: "accountStatus",
      text: "Status",
    },
    {
      formatter: (cellContent, row) => {
        return (
          <div className="d-flex flex-wrap">
            <button
              className="btn btn-info btn-xs"
              title="Edit"
              onClick={() => {
                setModalShow(true);
                handleEdit(row);
              }}
            >
              <i className="fa fa-edit" />
            </button>
            &nbsp;&nbsp;
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
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Customers",
        data: monthlyEnrolls.totalCustomers,
        fill: false,
        backgroundColor: "teal",
        borderColor: "lightblue",
      },
      {
        label: "Total Enrolls",
        data: monthlyEnrolls.totalEnrolls,
        fill: false,
        backgroundColor: "orange",
        borderColor: "lightblue",
      },
      {
        label: "Total Amount",
        data: monthlyEnrolls.totalAmount,
        fill: false,
        backgroundColor: "green",
        borderColor: "lightblue",
      },
    ],
  };

  const options = useMemo(() => {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }, []);

  return (
    <div>
      <div className="d-flex bg-primary rounded text-white align-items-center flex-wrap">
        <h1 className="container-fluid col-lg-9 col-md-12 col-sm-12 col-xs-12 m-0">
          Dashboard{" "}
          <button
            className="btn btn-primary"
            onClick={() => getAllUsersDatas()}
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
            <h4>Total Customers</h4>
            <Counter end={usersCount} />
          </div>
          <div
            className="card col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-warning text-white text-center"
            style={{ height: 100 }}
          >
            <h4>Total Enrolls</h4>
            <Counter end={enrollsCount} />
          </div>
          <div
            className="card col-lg-2 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-info text-white text-center"
            style={{ height: 100 }}
          >
            <h4>Active Users</h4>
            <Counter end={activeUsers} />
          </div>
          <div
            className="card col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-2 mb-2 bg-success text-white text-center"
            style={{ height: 100 }}
          >
            <h3>Available Amount</h3>
            <div className="d-flex justify-content-center align-items-center">
              <h4 className="d-flex align-items-center justify-content-center">
                <span>₹</span>
                <Counter end={totalAmount} />
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
      {!loading ? (
        <div>
          <div className="d-block form-group">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="form-control"
              placeholder="Search User"
            />
          </div>

          <div>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              updata={updateObj}
              handlecallback={handleCallback}
            />
          </div>
          <h1>
            All Orders{" "}
            {searchKey.length > 0 && (
              <small>
                (Search results found:{" "}
                {
                  productss.filter((item) => {
                    return (
                      item.name
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) !== -1 ||
                      item.email
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) !== -1 ||
                      item.coursename
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) !== -1 ||
                      item.registeredDate
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
                -1 ||
                item.email.toLowerCase().indexOf(searchKey.toLowerCase()) !==
                -1 ||
                item.coursename
                  .toLowerCase()
                  .indexOf(searchKey.toLowerCase()) !== -1 ||
                item.registeredDate
                  .toLowerCase()
                  .indexOf(searchKey.toLowerCase()) !== -1
              );
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
      <Bar data={data} options={options} height={100} />
      {/*<Line data={data} options={options} height={100} />*/}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllUsers,
      getAllUsersData,
      getAllEnrolls,
      getAllActiveUsers,
      updateUserData,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(Dashboard);
