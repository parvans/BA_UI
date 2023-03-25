import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { Button, Input } from "reactstrap";
export function SearchBar({ globalFilter, setGlobalFilter }, props) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  const { variant, children, ...rest } = props;
  return (
    <>
      <CInputGroup className="searchCon" style={{ width: "200px", paddingBottom: "20px" }} {...rest}>
        <CInputGroupText
          style={{
            height: "42px",
            backgroundColor: "transparent",
            borderColor: "transparent",
            paddingLeft: 0,
            width: "100%",    
            paddingRight: "0px"
          }}
          children={
            <>
              <Input
                type="search"
                className="mass"
                style={{
                  borderRadius: 0,
                  fontSize: "13px",
                  borderStyle: "solid",
                  borderWidth: 1,
                  width: "100%",
                  borderColor: "1px solid #ced4da",
                }}
                value={value || ""}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder={`Search records...`
              }
              />
              <div style={{ display: "flex" }}>
                <Button
                //   shape="rounded-0"
                  style={{
                    height: "33.8px",
                    width: "33.5px",
                    backgroundColor: "#264D73",
                    borderColor: "transparent",
                  }}
                  type="button"
                  variant="ghost"
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <CIcon
                    icon={icon.cilMagnifyingGlass}
                    size="xl"
                    style={{ color: "white", marginLeft: "-10px" }}
                  ></CIcon>
                </Button>
              </div>
            </>
          }
        />
      </CInputGroup>
    </>
    );
}