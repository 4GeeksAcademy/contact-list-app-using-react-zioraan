
import { CreateContact } from "../component/CreateContact";


const getState = ({ getStore, getActions, setStore }) => {
	const handleResponse = (response) => {
		if (!response.ok) throw Error(response.statusText);
		return response.text().then(text => text ? JSON.parse(text) : {});
	};

const refreshContacts = () => {
	fetch("https://playground.4geeks.com/contact/agendas/Ryan/contacts")
		.then(handleResponse)
		.then((data) => {
			console.log("fetched contacts data:", data);
			if (Array.isArray(data.contacts)) {
				setStore({ contacts: data.contacts});
				console.log("contacts set in store:", data.contacts);
			} else {
				console.error("fetched data is not an array:", data);
				setStore({ contacts: [] });
			}
		})
		.catch((error) => console.error("fetching contacts failed:", error));
};
	return {
		store: {
			contacts: [],
		},
		actions: {
			getContacts: refreshContacts,
			
			createContact: async(contact) => {
				let option = {
					method: "POST",
					headers: {"Content-type": "application/json"},
					body: JSON.stringify(contact)
				}
				try {
					let response = await fetch("https://playground.4geeks.com/contact/agendas/Ryan/contacts", option)
					if (!response.ok){
						return false						
					}else{
						getActions().getContacts() 
						return true
					}
				}
				catch(error) {console.log(error)}	
			},

			/*editContact: (id, contactData) => {
				fetch(`https://playground.4geeks.com/contact/agendas/Ryan/contacts/${id}`, {
					method: "PUT",
					headers: {"Content-type": "application/json"},
					body: JSON.stringify(contactData),
				})
				.then(handleResponse)
				.then(( ) => refreshContacts())
				.catch((error) => console.error("editing contact failed:", error));
			}*/
			editContact: async (id, contactData) => {
				let option = {
				  method: "PUT",
				  headers: { "Content-type": "application/json" },
				  body: JSON.stringify(contactData),
				};
				try {
				  let response = await fetch(
					`https://playground.4geeks.com/contact/agendas/Ryan/contacts/${id}`,
					option
				  );
				  if (response.ok) {
					getActions().getContacts();
				  }
				} catch (error) {
				  console.error("editing contact failed:", error);
				}
			  },
		}
	};
};

export default getState;