import React from "react";
import { List, ListItem, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ListSubcampana({ nombre = "", descripcion = "" }) {
  return (
    <div>
      <List className="mt-1 space-y-2 pl-1.5 rounded-lg    hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 flex justify-center items-center">
        <ListItem>
          <span className="text-black dark:text-white text-xs	font-sans	">
            {nombre}
          </span>
        </ListItem>
      </List>
    </div>
  );
}
