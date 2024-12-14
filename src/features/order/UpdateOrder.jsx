/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import { toast } from "react-toastify";

function UpdateOrder({ order, isChange, priority, isValidPin }) {
  const { customer, address, phone } = order;
  const fetcher = useFetcher();
  
  return (
    <fetcher.Form method="PATCH" className="mt-7 bg-stone-200 p-4 rounded-sm">
      <h1 className="mb-5 font-semibold text-xl">Update Order</h1>
      <div className="sm:flex sm:justify-between items-center mb-5">
        <label className="font-semibold sm:basis-40">Name</label>
        <input
          type="text"
          name="customer"
          required
          className="input w-full sm:w-0 sm:grow"
          defaultValue={customer}
          disabled={!isChange || !isValidPin}
        />
      </div>
      <div className="sm:flex sm:justify-between items-center mb-5">
        <label className="font-semibold sm:basis-40">Adress</label>
        <input
          type="text"
          name="address"
          required
          className="input w-full sm:w-0 sm:grow"
          defaultValue={address}
          disabled={!isChange || !isValidPin}
        />
      </div>
      <div className="sm:flex sm:justify-between items-center mb-5">
        <label className="font-semibold sm:basis-40">Phone</label>
        <input
          type="text"
          name="phone"
          required
          className="input w-full sm:w-0 sm:grow"
          defaultValue={phone}
          disabled={!isChange || !isValidPin}
        />
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          name="priority"
          id="priority"
          className="focus:outline-none focus:ring focus:ring-yellow-300 accent-yellow-400 w-6 h-6"
          defaultChecked={priority === true ? true : false}
          disabled={(!isChange || priority) || !isValidPin}
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
        />
        <label htmlFor="priority" className="font-semibold">
          Want to yo give your order priority?
        </label>
      </div>
      <div className="text-right">
        {(isChange && isValidPin) && <Button type="large">Update</Button>}
      </div>
    </fetcher.Form>
  );
}

export async function action({ params, request }) {
  const order = await getOrder(params.id);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const updateData = {
    ...data,
    priority: data.priority === "on" || order[0].priority ? true : false,
    customer: data.customer.trim(),
  };
  const { status } = await updateOrder(params.id, updateData);
  if (status === 200) {
    toast.success("Updated Order Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (status === 400) {
    toast.error("Updated Order Failed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return null;
}

export default UpdateOrder;
