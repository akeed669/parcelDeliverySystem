import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getOrder,getOrders, saveOrder, updateParcelStatus } from "../services/orderService";

class OrderForm extends Form {

  state = {
    data: { address: "", destination: "", weight: "", description: ""},
    parcelStatusState:0,
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

    const nmo=this.state.data.status;
    this.setState({parcelStatusState:nmo});    
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

    console.log(datacopy);

    await updateParcelStatus(datacopy);

    // if(this.props.uType==="customer"){
    //   await saveOrder(datacopy);
    // } else{
    //   await updateParcelStatus(datacopy);
    // }

    //await saveOrder(datacopy);

    this.props.history.push("/deliveries");
  };

  render() {

    const previousParcelStatusDB= this.state.parcelStatusState;

    let parcelOptionChoices=[];

    const parcelOptionsArray=[{_id:1,name:"Assigned"},{_id:2,name:"Picked Up"},{_id:3,name:"Delivered"}]

    switch(previousParcelStatusDB){
      case 0:
        parcelOptionChoices=parcelOptionsArray;
        break;

      case 1:
        parcelOptionChoices=[{_id:2,name:"Picked Up"},{_id:3,name:"Delivered"}];
        break;

      case 2:
        parcelOptionChoices=[{_id:3,name:"Delivered"}];
        break;
    }

    const parcelStatusForm = this.state.data.status;

    const disableEdit = ((parcelStatusForm==0?false:true)||(this.props.uType==="customer"?false:true));

    return (
      <div>
        <h1>Parcel Details</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("address", "Address","text", disableEdit)}
          {this.renderInput("destination", "Destination","text",disableEdit)}
          {this.renderInput("weight", "Weight","text",disableEdit)}
          {this.renderInput("description", "Description","text",disableEdit)}
          {this.renderSelect("status", "Order Status",parcelOptionChoices)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
