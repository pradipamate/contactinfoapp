import React, { Component } from "react";
import uuid from "uuid";
import {Addcontact,updated} from "./practice/actions/ContactinfoAction";
import {Col,Button, Container, Row,Form,Modal,Table,} from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { connect } from "react-redux";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validfullnameregex = /^[a-zA-Z ]*$/;
const validphonenumberregex = /^[0]?[789]\d{9}$/;
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phonenumber: "",
      companyname:"",address:"",
      editid: "",
      errors: { fullname: "", email: "", phonenumber: "", companyname: "",address: "" },
      Addcontactmodal: false,
      editcontactmodal: false,
      viewcontactmodal: false,
    };

    this.submithandler = this.submithandler.bind(this);
    this.Edithandler = this.Edithandler.bind(this);
    this.AddInfoHandler = this.AddInfoHandler.bind(this);
    this.modalClosehandle = this.modalClosehandle.bind(this);
    this.Taskdataview = this.Taskdataview.bind(this);
  }

  AddInfoHandler = () => {
    this.setState({
      Addcontactmodal: !this.state.Addcontactmodal,
    });
  };

  modalClosehandle = (event) => {
    this.setState({
      Addcontactmodal: false,
      editcontactmodal: false,
      viewcontactmodal: false,
    });
  };

  // for add Contact handler//
  changehandler = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch(name) {
        case 'fullname': 
        errors.fullname = validfullnameregex.test(value)? '' : 'Only Accept Characters !';
        break;
        case 'email':
        errors.email = validEmailRegex.test(value)? '': 'Email is not valid!';
        break;
        case 'phonenumber':
        errors.phonenumber = validphonenumberregex.test(value)? '' : 'Phone Number is not valid!';
        break;
        case 'companyname': 
        errors.companyname = value.length < 0 ? 'Enter Company Name' : '';
        break;
        case 'address': 
        errors.address = value.length < 0 ? 'enter Address' : '';
        break;
        default:
        break;
    }
    
    this.setState({
      errors,[name]:value,
    });

  };


  //  updates change handler//
  Updatechangehandler = (event) => { 
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch(name) {
        case 'fullname': 
        errors.fullname = validfullnameregex.test(value)? '': 'Only Accept Characters !';
        break;
        case 'email':
        errors.email = validEmailRegex.test(value)? '': 'Email is not valid!';
        break;
        case 'phonenumber': 
        errors.phonenumber = validphonenumberregex.test(value) ? '' : 'Phone Number is not valid!';
        break;
        case 'companyname':
         errors.companyname = value.length < 0 ? 'Enter Company Name' : '';
        break;
        case 'address':
        errors.address = value.length < 0 ? 'enter Address' : '';
        break;
        default:
        break;
    }
    this.setState({
      errors,[name]:value,
    });

  };


  // for submit contact Info//
  submithandler = (event) => {
    event.preventDefault();
      this.setState({
        Addcontactmodal:!this.state.Addcontactmodal,
      });

    if(validateForm(this.state.errors)) {
            if (this.state !== "") {
              var data = {};
              data.fullname = this.state.fullname; 
              data.email = this.state.email; 
              data.companyname = this.state.companyname;
              data.phonenumber = this.state.phonenumber;
              data.address=this.state.address;
              data.id = uuid.v4();
              this.props.dispatch(Addcontact(data));
              this.setState({ fullname: "",email: "",phonenumber: "",companyname:"",address:"" });
             }
          } 
     else {
          alert("Please Fill All Information");
          this.setState({
              Addcontactmodal:true
          })
       }
  };

  Edithandler = (event) => {
    var edit_id = event.target.id;
    const data = this.props.Listdata.find((item) => item.id === edit_id);
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
      editid: edit_id,
      fullname: data.fullname, 
      email: data.email,
      phonenumber: data.phonenumber,
      companyname: data.companyname,
      address: data.address,
    });
  };

  updated_submithandler = (event) => {
    event.preventDefault();
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
    });
    if (this.state!== "") {
      var newdata = {};
      newdata.id = this.state.editid; 
      newdata.fullname = this.state.fullname;
      newdata.email = this.state.email; 
      newdata.address = this.state.address;
      newdata.companyname = this.state.companyname;
      newdata.phonenumber = this.state.phonenumber;
      this.props.dispatch(updated(newdata));
    }
  };

  Taskdataview = (id) => {
    var Requestviewdata = this.props.Listdata.find((item) => item.id===id);
    this.setState({
      viewcontactmodal: !this.state.viewcontactmodal,
      fullname: Requestviewdata.fullname,
      email: Requestviewdata.email,companyname: Requestviewdata.companyname,
      phonenumber: Requestviewdata.phonenumber,address: Requestviewdata.address
    });
  };
  

  render() {
    const {errors} = this.state;
    var AvailableData = this.props.Listdata;
    if (AvailableData !== null) {
      var AllTaskList = AvailableData.map((item) => (
        <tr key={item.id}>
            <td><span className="username" onClick={() => this.Taskdataview(item.id)}>{item.fullname}</span> <br/> <span className="defalut">{item.email}</span></td>
            <td>{item.companyname}</td>
            <td>{item.phonenumber}</td>
            <td>{item.address}</td>
            <td><Button variant="primary mr-2 "> <i className="fa fa-pencil-square-o" aria-hidden="true" id={item.id} onClick={this.Edithandler} ></i></Button> </td>
        </tr>
      ));
    }
    return (
      <div>
        <Container fluid={true}>
            <Row className="startrow">
              <Col sm={12} xs={12}  className="view" className="text-right">
                <Button variant="success" className="themesflat-button "  onClick={this.AddInfoHandler}><i className="fa fa-plus" aria-hidden="true"></i> Add Contact </Button>
              </Col>
            </Row>
            <Row>
             <Col xs={12} sm={12}>
                <div className="TaskList">
                        <Table striped hover responsive>
                          <thead>
                            <tr className="thead">
                              <th>Basic Info</th>
                              <th>Company Name</th>
                              <th>Phone Number</th>
                              <th>Address</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                           <tbody>{AllTaskList}</tbody>
                       </Table>
               </div>

          <Modal show={this.state.Addcontactmodal} onHide={this.modalClosehandle}  >
              <Modal.Header closeButton  >
                  <Modal.Title>Add Contact</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.submithandler}>
                    <Row>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label>Full name</Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="fullname"  required />
                             {errors.fullname.length > 0 && <span className="text-danger">{errors.fullname}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Email</Form.Label>
                          <Form.Control type="email" onChange={this.changehandler} name="email" required />
                             {errors.email.length > 0 && <span className="text-danger">{errors.email}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Phone number</Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="phonenumber" required />
                             {errors.phonenumber.length > 0 && <span className="text-danger">{errors.phonenumber}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Company Name</Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="companyname" required />
                             {errors.companyname.length > 0 && <span className="text-danger">{errors.companyname}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group>
                           <Form.Label> Address</Form.Label>
                             <Form.Control as="textarea" rows="5" placeholder="Enter Address" onChange={this.changehandler} name="address"  required />
                              {errors.address.length > 0 && <span className="text-danger">{errors.address}</span>}
                         </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button variant="secondary" type="submit"  className="themesflat-button blue mr-2"  onClick={this.modalClosehandle}> Cancel </Button>
                          <Button variant="success" type="submit"  className="themesflat-button blue">  Save Changes </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>
          
            <Modal show={this.state.editcontactmodal} onHide={this.modalClosehandle}>
              <Modal.Header closeButton >
                <Modal.Title>Edit Contact </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.updated_submithandler}>
                    <Row>
                      <Col sm={12}>
                        <Form.Control type="hidden"name="id" value={this.state.edit_id}/>
                        <Form.Group >
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text"  onChange={this.Updatechangehandler} name="fullname"  value={this.state.fullname}  required />
                                  {errors.fullname.length > 0 && <span className="text-danger">{errors.fullname}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Email</Form.Label>
                          <Form.Control type="email"  onChange={this.Updatechangehandler}  name="email"  value={this.state.email}  required />
                                {errors.email.length > 0 && <span className="text-danger">{errors.email}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Company Name</Form.Label>
                          <Form.Control  type="text" onChange={this.Updatechangehandler}  name="companyname"  value={this.state.companyname}  required />
                            {errors.companyname.length > 0 && <span className="text-danger">{errors.companyname}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Phone Number</Form.Label>
                          <Form.Control  type="text" onChange={this.Updatechangehandler}  name="phonenumber"  value={this.state.phonenumber}  required />
                          {errors.phonenumber.length > 0 && <span className="text-danger">{errors.phonenumber}</span>} 
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group>
                           <Form.Label> Address</Form.Label>
                             <Form.Control as="textarea" rows="5"  onChange={this.Updatechangehandler} name="address"  value={this.state.address}  required />
                             {errors.address.length > 0 && <span className="text-danger">{errors.address}</span>} 
                         </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button  variant="secondary"  className="themesflat-button blue mr-2"  onClick={this.modalClosehandle}> Cancel </Button>
                          <Button  variant="success"  type="submit"  className="themesflat-button blue"> Save </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>
         
            <Modal  className="viewmodal" show={this.state.viewcontactmodal} onHide={this.modalClosehandle}>
              <Modal.Header closeButton >
                <Modal.Title className="view">View Contact Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Row>
                      <Col sm={12}>
                          <Form.Group as={Row} >
                              <Form.Label column sm="6">Fullname : </Form.Label>
                              <Col sm="6">
                                  <Form.Control plaintext readOnly  value={this.state.fullname} readOnly/>
                              </Col>
                         </Form.Group>
                      </Col>
                      <Col sm={12}>
                         <Form.Group as={Row} >
                              <Form.Label column sm="6">Email :</Form.Label>
                              <Col sm="6">
                                  <Form.Control plaintext readOnly  value={this.state.email} readOnly/>
                              </Col>
                         </Form.Group>
                      </Col>
                      <Col sm={12}>
                         <Form.Group as={Row} >
                                <Form.Label column sm="6">Company Name : </Form.Label>
                                <Col sm="6">
                                    <Form.Control plaintext readOnly  value={this.state.companyname} readOnly/>
                                </Col>
                          </Form.Group>
                      </Col>
                      <Col sm={12}>
                          <Form.Group as={Row} >
                                <Form.Label column sm="6">Phone Number : </Form.Label>
                                <Col sm="6">
                                    <Form.Control plaintext readOnly  value={this.state.phonenumber} readOnly/>
                                </Col>
                          </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group as={Row} >
                                <Form.Label column sm="6">Address : </Form.Label>
                                <Col sm="6">
                                    <Form.Control plaintext readOnly  value={this.state.address} readOnly/>
                                </Col>
                          </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button variant="secondary" className="themesflat-button blue mr-2" onClick={this.modalClosehandle} > Cancel </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Listdata: state.ContactInfo,
  };
};
export default connect(mapStateToProps)(App);
