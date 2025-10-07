import { faArrowLeft, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../../components/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../../../components/Button";
const EditGeneralInfo = ({ handleSave, handleActiveForm, existingData }) => {
  const schema = yup.object().shape({
    firstName: yup.string().required("this field is required"),
    lastName: yup.string().required("this field is required"),
    contact: yup.string(),
    address: yup.object().shape({
      streetAddress: yup.string(),
      cityState: yup.string(),
      postalCode: yup.string(),
    }),
    email: yup.string().email("invalid email"),
  });
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingData,
  });

  return (
    <div className="bg-white p-8 max-w-xl mx-auto">
      <div className="flex items-center mb-6">
        <Icon
          onClick={() => handleActiveForm()}
          icon={faArrowLeft}
          size="2xl"
          className="text-2xl p-3 hover:bg-gray-200 rounded-lg mr-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">Contact information</h1>
      </div>
      <p className="text-gray-600 mb-8">Please fill out the form below. *required</p>

      <form
        onSubmit={handleSubmit((data) => {
          handleSave(data);
          handleActiveForm();
        })}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
              First name *
            </label>
            <input
              {...register("firstName")}
              type="text"
              id="first-name"
              defaultValue="Faizan"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
              Last name *
            </label>
            <input
              {...register("lastName")}
              type="text"
              id="last-name"
              defaultValue="Afsar"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="flex">
              <input
                {...register("contact")}
                type="tel"
                id="phone"
                defaultValue="305-5367458"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-number"
              defaultChecked
              className="h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="show-number" className="ml-2 block text-sm text-gray-900 font-medium">
              Show my number on Talento
            </label>
          </div>
          <p className="text-xs text-gray-500">
            By submitting the form with this box checked, you confirm that you are the primary user and subscriber to the
            telephone number provided, and you agree to receive calls (including using artificial or pre-recorded voice), texts,
            and WhatsApp messages from Talento and employers who use Talento at the telephone number provided above.
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-gray-900">fa.03055671518@gmail.com</p>
            </div>
            <a href="#" className="text-blue-600 font-semibold flex items-center">
              Edit <Icon icon={faArrowRight} size="sm" className="ml-2" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Country</p>
              <p className="text-gray-900">Pakistan</p>
            </div>
            <a href="#" className="text-blue-600 font-semibold">
              Change
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 mb-1">
                Street address
              </label>
              <p className="text-xs text-gray-500 mb-1">Not shown to employers.</p>
              <div className="relative">
                <input
                  {...register("address.streetAddress")}
                  type="text"
                  id="street-address"
                  defaultValue="Near Alsaudia Plaza 26 Area Gudwal Wah Cantt"
                  className="w-full border border-gray-300 rounded-md p-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
                />
                <Icon
                  icon={faXmark}
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label htmlFor="city-state" className="block text-sm font-medium text-gray-700 mb-1">
                City, State *
              </label>
              <div className="relative">
                <input
                  {...register("address.cityState")}
                  type="text"
                  id="city-state"
                  defaultValue="Wah Cantonment"
                  className="w-full border border-gray-300 rounded-md p-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
                />
                <Icon
                  icon={faXmark}
                  size="sm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 mb-1">
                Postal code
              </label>
              <input
                {...register("address.postal")}
                type="text"
                id="postal-code"
                defaultValue="47040"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5">
          <Button label="save" className="" style="primary" type="submit"></Button>
        </div>
      </form>

      <footer className="text-center mt-12 text-xs text-gray-500">
        <p>
          ©2025 Talento -
          <a href="#" className="underline">
            Cookies
          </a>
          ,
          <a href="#" className="underline">
            Privacy
          </a>
          and
          <a href="#" className="underline">
            Terms
          </a>
        </p>
      </footer>
    </div>
  );
};

export default EditGeneralInfo;
