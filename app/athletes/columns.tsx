import { ColumnDef } from "@tanstack/table-core";
import { Athlete } from "@/interfaces/athlete";


const lookup = require("country-data").lookup;

export const columns: ColumnDef<Athlete>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    accessorKey: "country_code",
    header: "Country Flag",
    cell: ({ getValue }) => {
      const value = getValue();
      return lookup?.countries({ alpha3: value })[0]?.emoji;
    }
  },
  {
    accessorKey: "nationality",
    header: "Nationality"
  },
  {
    accessorKey: "height",
    header: "Height (m)",
    cell: ({ getValue }) => {
      const value = getValue();
      return value == "0" ? "X" : value;
    }
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
    cell: ({ getValue }) => {
      const value = getValue();
      return value == "0" ? "X" : value;
    }
  },
  {
    accessorKey: "disciplines",
    header: "Disciplines",
    cell: ({ getValue }) => {
      const value = getValue();
      return Array.isArray(value) ? value.join(", ") : value || "";
    }
  },
  {
    accessorKey: "events",
    header: "Events",
    cell: ({ getValue }) => {
      const value = getValue();
      return Array.isArray(value) ? value.join(", ") : value || "";
    }
  },
  {
    accessorKey: "birth_date",
    header: "Birth Date"
  },
  {
    accessorKey: "birth_country",
    header: "Birth Country"
  },
  {
    accessorKey: "education",
    header: "Education"
  },
  {
    accessorKey: "lang",
    header: "Languages",
    cell: ({ getValue }) => {
      const value = getValue() ?? "";
      return value.replaceAll(", ", ", ");
    }
  },
  {
    accessorKey: "coach",
    header: "Coach"
  },
  {
    accessorKey: "reason",
    header: "Reason for Sport"
  },
  {
    accessorKey: "influence",
    header: "Influence"
  },
  {
    accessorKey: "philosophy",
    header: "Philosophy"
  },
  {
    accessorKey: "sporting_relatives",
    header: "Sporting Relatives"
  },
  {
    accessorKey: "medals",
    header: "Medals",
    cell: ({ getValue }) => {
      const value = getValue();
      return value?.toString() ?? "";// Array.isArray(value) ? value.join(", ") : value || "";
    }
  }
];
