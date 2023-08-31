import { object, string } from "yup";
export default object({
    body: object(
        {

            destination: string().required("destination is required").url("should be a url")
        }
    )
})