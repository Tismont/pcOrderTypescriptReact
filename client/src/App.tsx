import { FormikHelpers } from "formik";
import React from "react";
import "./App.css";
import Form, { FormData } from "./components/form";

function App() {
  const [screenSize, setScreenSize] = React.useState<number>(10);
  const [RAM, setRAM] = React.useState<number>(10);
  const [insurance, setInsurance] = React.useState<number>(10);

  React.useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3000/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setScreenSize(records[0].screenSize);
      setRAM(records[0].RAM);
      setInsurance(records[0].insurance);
    }

    getRecords();

    return;
  }, []);

  async function onSubmit(
    values: FormData,
    formikHelpers: FormikHelpers<FormData>
  ) {
    let price =
      Number(values.RAM) * RAM + Number(values.screenSize) * screenSize;
    if (values.insurance) {
      price += insurance;
    }

    let newOrder = {
      email: values.email,
      telephone: values.telephone,
      totalPrice: price,
    };

    await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    formikHelpers.setSubmitting(false);
  }

  return (
    <div className="App">
      <Form onSubmit={onSubmit} />
    </div>
  );
}

export default App;
