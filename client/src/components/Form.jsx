import "../styles/Home.css";
import { FormInput } from "../components/FormInput";
import { FormData } from "../components/FormData";
import Axios from "axios";

export const Form = ({functionForm, handleChange, setOpenUpdate, form, setForm, openUpdate}) => {
    
    const createClient = () => {
        Axios.post("http://localhost:3001/api/insert", {
          product: form.product,
          amount: parseInt(form.amount),
          price: parseFloat(form.price),
        }).then(() => {
            functionForm("Client created")
        });
      };
    
      const updateClient = (id) => {
        Axios.put("http://localhost:3001/api/update", {
          id: id,
          product: form.product,
          amount: parseInt(form.amount),
          price: parseFloat(form.price),
        }).then(() => {
            functionForm("Client updated")
        });
      };
    
      const handleSubmit = () => {
        openUpdate.create ? createClient() : updateClient(form.id);
      };

      const closeForm = () => {
        setOpenUpdate({ open: false, create: true });
        setForm({ product: "", amount: "", price: "", id: "" });
      };

  return (
    <div className="form_container" onClick={closeForm}>
      <div className="form_box">
        <button className="close" onClick={closeForm}>
          <i className="fas fa-times" />
        </button>
        <h1>Add Client</h1>
        {FormData.map((item, index) => (
          <FormInput
            key={index}
            label={item.label}
            type={item.type}
            onChange={handleChange}
            name={item.name}
            value={form[item.name]}
          />
        ))}
        <button className="sumbit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};