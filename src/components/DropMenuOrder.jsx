"use client";
import Multiselect from "multiselect-react-dropdown";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderFilter } from "@/store/slices/car"; // Asegúrate de importar esto desde la ubicación correcta
import { useTranslation } from "react-i18next";

const DropMenuOrder = () => {
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = useState([]);
  const { t } = useTranslation();
  const optionsOrden = [
    { name: t("price-max"), id: "MayorPrecio" },
    { name: t("price-min"), id: "MenorPrecio" },
    { name: t("cal-max"), id: "MayorRating" },
    { name: t("cal-min"), id: "MenorRating" },
  ];

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    // Dispatch orderFilter action here with the selected item's id
    dispatch(orderFilter(selectedItem.id));
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
    // Dispatch orderFilter action here with an empty string or default value
    dispatch(orderFilter("")); // You may need to adjust this depending on your implementation
  };
  const customStyles = {
    multiselectContainer: {
      width: "95%",
      margin: "0px",
      padding: "0px",
      //   margin: "5px",
    },
    searchBox: {
      border: "none",
      fontSize: "0.8rem",
      padding: "5px 0",
      //   minHeight: "10px",
      background: "white",
      margin: "0px 0 5px 0",

      //   padding: "8px 0px 5px 5px",
    },
    inputField: {
      margin: "5px",
      marginTop: "6px",
    },
    chips: {
      margin: "2px 0 2px 0",
    },
    optionContainer: {
      background: "white",
      right: "40",
    },
    option: {
      color: "black",
    },
    groupHeading: {
      // Add styles as needed for group headings
    },
  };

  return (
    <div>
      <Multiselect
        options={optionsOrden}
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        displayValue="name"
        placeholder={t("selected")}
        singleSelect={true}
        style={customStyles}
      />
    </div>
  );
};

export default DropMenuOrder;
