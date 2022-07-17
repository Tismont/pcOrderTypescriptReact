import * as Yup from "yup";
import { FormValues } from "../components/form";

const initialValues: FormValues = {
  email: "",
  telephone: "",
  RAM: "",
  screenSize: "",
  insurance: false,
}

const telephoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const yupCheck = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(100, "Character limit exceeded")
    .required("Email is required"),
  telephone: Yup.string().matches(telephoneRegExp, "Phone number is not valid"),
  RAM: Yup.number()
    .min(1, "Number is too low")
    .max(150, "Number is too high")
    .required("RAM is required"),
  screenSize: Yup.number()
    .min(15, "Number is too low")
    .max(40, "Number is too high")
    .required("Screen size is required"),
});

export { yupCheck, initialValues };