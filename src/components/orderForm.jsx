import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getOrder, saveOrder } from "../services/orderService";

class OrderForm extends Form {

  state = {
    data: { address: "", destination: "", weight: "", description: ""},
    errors: {}
  };

  schema = {
    id: Joi.string(),
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

      const {data:order} = await getOrder(orderId);
      //console.log("jok")

      this.setState({ data: this.mapToViewModel(order)});

    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMovie();
    //console.log("yay")

    const { email } = this.props;
    let data = { ...this.state.data };
    data.owner=email;
    data.state=0;

    this.setState({data});
    //this.setState({parcelOwner:email, parcelState:3});
  }

  mapToViewModel(order) {
    return {
      id: order.id,
      address: order.address,
      destination: order.destination,
      description: order.description,
      weight: order.weight,
    };
  }

  doSubmit = async () => {
    await saveOrder(this.state.data);
    this.props.history.push("/deliveries");
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
