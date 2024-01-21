import React, { useState } from "react";
import { useExpensesContext } from "../context/ExpensesContext";

function NewItem({ categories, fetch, add }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [choice, setChoice] = useState("");

  const handleSelection = (event) => {
    event.preventDefault();
    const selection = event.target.value;
    setChoice(selection);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extracting the date and time from the datetime-local input
    const selectedDateTime = new Date(date);

    const year = selectedDateTime.getFullYear();
    const month = selectedDateTime.getMonth() + 1; // Months are zero-indexed
    const day = selectedDateTime.getDate();

    const hours = selectedDateTime.getHours();
    const minutes = selectedDateTime.getMinutes();
    const seconds = selectedDateTime.getSeconds();

    // Format the date and time components as needed
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;

    await add({
      name,
      amount,
      date: formattedDate,
      time: formattedTime,
      category: choice,
    });

    await fetch();
    setName("");
    setAmount("");
    setDate(""); // Clear the date after submitting the form
    setChoice("");
  };

  return (
    <section className="newExpnse">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          className="input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="off"
        />
        <input
          type="text"
          className="input"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Price"
          required
          autoComplete="off"
        />

        <select
          required
          onChange={handleSelection}
          className="select"
          defaultValue=""
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="input"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
          autoComplete="off"
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
    </section>
  );
}

export default NewItem;
