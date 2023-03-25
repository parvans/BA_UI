import React, { Fragment, useEffect, useState } from "react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import PropTypes from "prop-types";
import {useTable,useSortBy,usePagination,useGlobalFilter,} from "react-table";
import { Button, Input, Table } from "reactstrap";
import { CButton, CFormInput } from "@coreui/react";
import {MdOutlineKeyboardArrowLeft,MdOutlineKeyboardArrowRight} from "react-icons/md";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";
import { SearchBar } from "./SearchBar";
import { Select } from "@mui/material";
const TableContainer=({ columns, data, onClick})=>{
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        setGlobalFilter,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
      } = useTable(
        {
          columns,
          data,
          initialState: { pageSize: 5 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
      );
      // const [select, setSelect] = useState([
      //   { value: "Available", label: "Available" },
      //   { value: "Unavailable", label: "Unavailable" },
      // ]);
      // const [selected, setSelected] = useState("");
      // console.log(selected);
      const generateSortingIndicator = (column) => {
        return column.isSorted ? (
          column.isSortedDesc ? (
            <TiArrowUpOutline
              style={{ color: "white", marginBottom: "3px" }}
              size="17px"
            />
          ) : (
            <TiArrowDownOutline
              style={{ color: "white", marginBottom: "3px" }}
              size="17px"
            />
          )
        ) : (
          ""
        );
      };
    
      
    
      // console.log(data);
      const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
      };
    
      const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
      };
      // const byCategory = (user, category) => {
      //   console.log(user);
      //   if (category) {
      //     return user.category === category;
      //   } else return user;
      // };
      // const filterhendling = (data, selected) => {
      //   console.log("a");
      //   if (selected === "Available") return data.isAvailable == true;
      //   alert("hi");
      // };
      // useEffect(() => {
      //   // filterhendling()
      // }, []);
      //  console.log(selected);
      return (
        <Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <SearchBar
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
           
            <select
              className="form-select selectCon"
              value={pageSize}
              onChange={onChangeInSelect}
              style={{ width: "176px", height: "40px" }}
            >
              {[5, 10, 15, 20, 25].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Rows per page {pageSize}
                </option>
              ))}
            </select>
          </div>
          <Table bordered hover responsive {...getTableProps()}>
            <thead
              style={{
                textAlign: "center",
                color: "white",
                backgroundColor: "#264D73",
              }}
            >
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th style={{ minWidth: "150px" }} {...column.getHeaderProps()}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")} {generateSortingIndicator(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
    
            <tbody {...getTableBodyProps()}>
              {page?.map((row, index) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell", { index: index })}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
          {/*       
          {/* <Container > */}
          <div
            className="RecoverPagenaCon"
            md={3}
            style={{
              alignItems: "center",
              textAlign: "center",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {onClick ? (
                <CButton
                  type="button"
                  variant="ghost"
                  _focus={{
                    boxShadow: "none",
                  }}
                  style={{
                    cursor: "pointer",
                    borderColor: "transparent",
                  }}
                  onClick={onClick}
                >
                  <CIcon icon={icon.cilHistory} size="xl"></CIcon>
                </CButton>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textAlign: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                type="button"
                variant="ghost"
                _focus={{
                  boxShadow: "none",
                }}
                style={{
                  borderColor: "transparent",
                }}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <RxDoubleArrowLeft
                  style={{ color: "#264D73" }}
                  size="15px"
                ></RxDoubleArrowLeft>
              </Button>
              <Button
                type="button"
                variant="ghost"
                _focus={{
                  boxShadow: "none",
                }}
                style={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                <MdOutlineKeyboardArrowLeft
                  style={{ color: "#264D73" }}
                  size="20px"
                ></MdOutlineKeyboardArrowLeft>
              </Button>
    
              <div>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </div>
    
              <Input
                type="number"
                min={1}
                style={{ width: 70, paddingLeft: "30px" }}
                max={pageOptions.length}
                defaultValue={pageIndex + 1}
                onChange={onChangeInInput}
              />
              <Button
                type="button"
                variant="ghost"
                style={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                onClick={nextPage}
                disabled={!canNextPage}
              >
                <MdOutlineKeyboardArrowRight
                  style={{ color: "#264D73" }}
                  size="20px"
                ></MdOutlineKeyboardArrowRight>
                {/* <CIcon   icon={ icon.cilChevronRight }
                size="sm" style={{color:'#264D73'}}></CIcon> */}
              </Button>
              <Button
                type="button"
                variant="ghost"
                style={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <RxDoubleArrowRight
                  style={{ color: "#264D73" }}
                  size="15px"
                ></RxDoubleArrowRight>
              </Button>
            </div>
          </div>
          {/* </Container> */}
        </Fragment>
      );
    };
    TableContainer.propTypes = {
      // Pass in a Component to override default element
      tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      size: PropTypes.string,
      bordered: PropTypes.bool,
      borderless: PropTypes.bool,
      striped: PropTypes.bool,
      dark: PropTypes.bool,
      hover: PropTypes.bool,
      responsive: PropTypes.bool,
}
export default TableContainer;