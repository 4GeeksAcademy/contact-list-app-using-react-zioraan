import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateContact = () => {
  const { store, actions} = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [phone, setPhone] = useState ('');
  const [address, setAddress] = useState ('');
  const [isLoading, setIsLoading] = useState (true);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.contacts.length === 0 && !isLoading) {
      actions.getContacts().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [store.contacts, actions, isLoading]);
  // useEffect(() => {
  //   if (store.contacts.length === 0) {
  //     actions.getContacts().then(() => {
  //       setIsLoading(false);
  //     });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [store.contacts]);

  useEffect(() => {
    if (!isLoading && id) {
      const contact = store.contacts.find(contact => contact.id === parseInt(id));
      if (contact) {
        setName(contact.name);
        setAddress(contact.address);
        setEmail(contact.email);
        setPhone(contact.phone);
      }
    }
  }, [id, store.contacts, isLoading]);

  const handleSave = async () => {
    const contactData = {
      name: name,
      email: email,
      phone: phone,
      address: address
    };

    if (id) {
      await actions.editContact(id, contactData);
    } else {
      await actions.createContact(contactData);
    }
    navigate("/");
    /* actions.createContact({
      name: name,
      email: email,
      phone: phone,
      address: address
    }).then(() => {
      navigate("/");
    }); */
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center mt-5">{id ? "Edit Contact" : "Add a new contact"}</h1>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              value = {name}
              onChange={(e) => {setName(e.target.value)}}
              type="text"
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
             value = {email}
             onChange={(e) => {setEmail(e.target.value)}}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
             value = {phone}
             onChange={(e) => {setPhone(e.target.value)}}
              type="phone"
              className="form-control"
              placeholder="Enter phone"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
             value = {address}
             onChange={(e) => {setAddress(e.target.value)}}
              type="text"
              className="form-control"
              placeholder="Enter address"
            />
          </div>
          <button onClick={handleSave} type="button" className="btn btn-primary form-control">
            {id ? "Save Changes" : "Save"}
          </button>
          <Link className="mt-3 w-100 text-center" to="/">
            or get back to contacts
          </Link>
        </form>
      </div>
    </div>
  );
};