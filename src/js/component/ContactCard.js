import React , {useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ContactCard = ({contact}) => {
  const {store,actions} = useContext(Context)

  return (
    <li className="list-group-item">
                <div className="">
                    <div className="container col-12 col-sm-6 col-md-9 text-center text-sm-left d-flex">
                        <div className="mx-auto">
                          <label className="name lead">{contact.name}</label>
                          <br /> 
                          <i className="fas fa-map-marker-alt text-muted mr-3"></i>
                          <span className="text-muted">{contact.address}</span>
                          <br />
                          <span className="fa fa-phone fa-fw text-muted mr-3" data-toggle="tooltip" title="" data-original-title=""></span>
                          <span className="text-muted small">{contact.phone}</span>
                          <br />
                          <span className="fa fa-envelope fa-fw text-muted mr-3" data-toggle="tooltip" data-original-title="" title=""></span>
                          <span className="text-muted small text-truncate">{contact.email}</span>
                        </div>
                        <div className="me-0">
                          <Link to={`edit-contact/${contact.id}`} className="btn"><i className="fas fa-pencil-alt mr-3"></i></Link>
                          <button className="btn" onClick={() => this.props.onDelete()}><i className="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </li>
  );
}
