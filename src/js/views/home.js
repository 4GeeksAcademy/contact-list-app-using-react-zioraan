import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { ContactCard } from "../component/ContactCard";
import { Context } from "../store/appContext";

export const Home = () => {
	// const context = useContext(Context)
	const {store, actions} = useContext(Context);
	useEffect(() => {
		if (!store.contacts){
			actions.getContacts()
		}
	}, [store.contacts])
	return(
	<div className="text-center mt-5">
		{store.contacts && store.contacts.map( (contact) => {
			return 	<ContactCard contact = {contact} key = {contact.id} />

		})}
	
	</div>
);}