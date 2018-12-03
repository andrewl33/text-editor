import { API_URL as URL } from "../envConstants";

export default async function allData(isFiltered: boolean, filterString = "") {
  const data = {
    isFilter: isFiltered,
    filterString
  };

  const res = await fetch(`${URL}/grading/all`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const body = await res.json();

  return body;
}
