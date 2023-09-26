import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

function Table({ tableHeaders, tableDetails }) {
  const { theme } = useTheme();
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: theme === "light" ? "white" : "#1e293b",
        color: theme === "light" ? "black" : "white",
      },
    },
    rows: {
      style: {
        backgroundColor: theme === "light" ? "white" : "#1e293b",
        color: theme === "light" ? "black" : "white",
      },
    },
    pagination: {
      style: {
        backgroundColor: theme === "light" ? "white" : "#1e293b",
        color: theme === "light" ? "black" : "white",
      },
    },
    cell: {
      style: {
        // backgroundColor: "red",
      },
    },
  };
  return (
    <DataTable
      columns={tableHeaders}
      data={tableDetails}
      selectableRows
      pagination
      customStyles={customStyles}
    />
  );
}

export default Table;
