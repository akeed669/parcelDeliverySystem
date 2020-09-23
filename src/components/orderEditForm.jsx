import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getOrder,getOrders, saveOrder, updateParcelStatus } from "../services/orderService";

class OrderForm extends Form {

  state = {
    data: { address: "", destination: "", weight: "", description: ""},
    errors: {}
  };

  schema = {
    id: Joi.number(),
    address: Joi.string().required().label("Address"),
    destination: Joi.string().required().label("Destination"),
    description: Joi.string().required().label("Description"),
    owner:Joi.string(),
    status:Joi.number(),
    deliveryAgent:Joi.string(),
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

      const {data} = await getOrders();

      for(let i=0;i<data.length;i++){
        if(data[i].id==orderId){
          this.setState({ data: this.mapToViewModel(data[i])});
        }
      }
      //this.setState({ data: this.mapToViewModel(order)});

    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMovie();
    // console.log(this.state.data)
    //
    // // const { email } = this.props;
    // let data = { ...this.state.data };
    // // data.owner=email;
    // data.status=0;
    // data.deliveryAgent="Unassigned"
    //
    // console.log(data)
    //
    // this.setState({data});
    // this.setState({parcelOwner:email, parcelState:3});
  }

  mapToViewModel(order) {
    console.log("papapaa")
    console.log(order)

    return {
      id: order.id,
      address: order.address,
      destination: order.destination,
      description: order.description,
      weight: order.weight,
      owner:order.owner,
      deliveryAgent:order.deliveryAgent,
      status:order.status,
    };
  }

  doSubmit = async () => {
    let datacopy={...this.state.data};
    datacopy.status=parseInt(datacopy.status);
    console.log("wesi")
    console.log(datacopy);
    //await saveOrder(datacopy);
    await updateParcelStatus(datacopy);
    this.props.history.push("/deliveries");
  };

  render() {

    return (
      <div>
        <h1>Parcel Details</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("address", "Address","text",true)}
          {this.renderInput("destination", "Destination","text",true)}
          {this.renderInput("weight", "Weight","text",true)}
          {this.renderInput("description", "Description","text",true)}
          {this.renderSelect("status", "Order Status",[{_id:1,name:"Unassigned"},{_id:2,name:"Assigned"},{_id:3,name:"Picked Up"},{_id:4,name:"Delivered"}])}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
