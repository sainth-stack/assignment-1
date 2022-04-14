import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default function AllOrders({paginationFactory, productss, columns}) {
  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={productss}
      columns={columns}
      pagination={paginationFactory({sizePerPage: 5})}
      cellEdit={true}
    />
  );
}
