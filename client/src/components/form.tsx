import "../App.css";
import { Formik, FormikHelpers } from "formik";
import { initialValues, yupCheck } from "../formik/formHelpers";

export type FormValues = {
  email: string;
  telephone: string;
  RAM: string;
  screenSize: string;
  insurance: boolean;
};

interface Props {
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<void>;
  RAM: number;
  screenSize: number;
  insurance: number;
  isLoaderVisible: boolean;
}

function Form({
  onSubmit,
  RAM,
  screenSize,
  insurance,
  isLoaderVisible,
}: Props) {
  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={yupCheck}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type={"email"}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="input"
              placeholder="email*"
            />
            <br />
            {errors.email && touched.email && errors.email}
            {errors.email ? <br /> : null}

            <input
              type={"tel"}
              name="telephone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.telephone}
              className="input"
              placeholder="telephone"
            />
            <br />
            {errors.telephone && touched.telephone && errors.telephone}
            {errors.telephone ? <br /> : null}

            <input
              type={"number"}
              name="RAM"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.RAM}
              className="input"
              placeholder="RAM*"
            />
            <br />
            {errors.RAM && touched.RAM && errors.RAM}
            {errors.RAM ? <br /> : null}

            <input
              type={"number"}
              name="screenSize"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.screenSize}
              className="input"
              placeholder="Diagonal size (in inches)*"
            />
            <br />
            {errors.screenSize && touched.screenSize && errors.screenSize}
            {errors.RAM ? <br /> : null}

            <div className="insurance">
              <input
                type={"checkbox"}
                name="insurance"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.insurance}
              />
              <label className="insuranceLabel">insurance</label>
            </div>

            {values.RAM && values.screenSize ? (
              <p className="currentPrice">
                Current price:{" "}
                {values.insurance
                  ? Number(values.RAM) * RAM +
                    Number(values.screenSize) * screenSize +
                    insurance
                  : Number(values.RAM) * RAM +
                    Number(values.screenSize) * screenSize}
              </p>
            ) : (
              <p className="currentPrice">
                Fill in RAM and screen size to see current price
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="button">
              Submit
            </button>

            {isLoaderVisible ? <div className="loader"></div> : null}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
