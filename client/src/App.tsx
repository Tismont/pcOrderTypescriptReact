import React from "react";
import { FormikHelpers, FormikValues } from "formik";
import "./App.css";
import Form, { FormValues } from "./components/form";

function App() {
  const [screenSize, setScreenSize] = React.useState<number>(0);
  const [RAM, setRAM] = React.useState<number>(0);
  const [insurance, setInsurance] = React.useState<number>(0);
  const [isLoaderVisible, setLoaderVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/prices`);

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
    values: FormikValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    setLoaderVisible(true);
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

    await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setTimeout(() => {
      setLoaderVisible(false);
      formikHelpers.setSubmitting(false);
    }, 2000);
  }

  return (
    <div className="App">
      <Form
        onSubmit={onSubmit}
        RAM={RAM}
        screenSize={screenSize}
        insurance={insurance}
        isLoaderVisible={isLoaderVisible}
      />
    </div>
  );
}

export default App;
