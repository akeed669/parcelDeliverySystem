import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getOrders, saveOrder } from "../services/orderService";

class OrderForm extends Form {

  state = {
    data: { address: "", destination: "", weight: "", description: ""},
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    address: Joi.string().required().label("Address"),
    destination: Joi.string().required().label("Destination"),
    description: Joi.string().required().label("Description"),
    owner:Joi.string(),
    state:Joi.number(),
    weight: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Parcel weight")
  };

  async populateMovie() {
    try {
      const orderId = this.props.match.params.id;
      if (orderId === "new") return;

      const { data: movie } = await getOrders(orderId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMovie();
    const { email } = this.props;

    let data = { ...this.state.data };
    data.owner=email;
    data.state=0

    //this.setState({parcelOwner:email, parcelState:3});
    this.setState({data});
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      address: movie.address,
      destination: movie.destination,
      description: movie.description,
      weight: movie.weight,
    };
  }

  doSubmit = async () => {    
    await saveOrder(this.state.data);
    //this.props.history.push("/orders");
  };

  render() {

    return (
      <div>
        <h1>Order Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("address", "Address")}
          {this.renderInput("destination", "Destination")}
          {this.renderInput("weight", "Weight")}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
