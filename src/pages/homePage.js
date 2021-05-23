import React from "react";
import {
  Table,
  Row,
  Col,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Badge,
} from "reactstrap";
import Axios from "axios";
import { getBarangAction } from "../actions";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "danger",
      message: "",
      visible: false,
      modalOpen: false,
      delModal: false,
      id: null,
    };
  }

  componentDidMount() {
    this.getDataBarang();
  }

  getDataBarang = () => {
    Axios.get("http://localhost:2021/products")
      .then((res) => {
        this.props.getBarangAction(res.data);
      })
      .catch((err) => {
        console.log("gagal get barang", err);
      });
  };

  deleteModal = (item) => {
    this.setState({ delModal: !this.state.delModal, id: item });
  };

  btSave = (id) => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDate() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes() +
      "-" +
      today.getSeconds();
    let name = this.nameEdit.value;
    let serial = parseInt(this.serialEdit.value);
    let stock = parseInt(this.stockEdit.value);
    let stockCheck = this.stockEdit.value;
    let category = this.categoryEdit.value;
    let price = parseInt(this.priceEdit.value);
    let priceCheck = this.priceEdit.value;
    let status = "avaiable";
    let dataEdit = { date, name, serial, stock, category, price, status };
    let data = {};
    for (let key in dataEdit) {
      if (
        dataEdit[key] !== this.props.products[this.state.selectedIndex][key]
      ) {
        data[key] = dataEdit[key];
      }
    }
    if (
      name === "" ||
      stockCheck === "" ||
      category === "" ||
      priceCheck === "" ||
      stock === 0
    ) {
      this.setState({
        visible: !this.state.visible,
        message: "Please input form field or stock must more than zero",
        color: "danger",
      });
      setTimeout(
        () =>
          this.setState({
            visible: !this.state.visible,
          }),
        3000
      );
    } else {
      Axios.patch(`http://localhost:2021/products/${id}`, data)
        .then((res) => {
          this.getDataBarang();
          this.setState({ selectedIndex: null });
        })
        .catch((err) => {
          console.log("gagal save data", err);
        });
    }
  };

  deleteProduct = () => {
    Axios.patch(`http://localhost:2021/products/${this.state.id}`, {
      status: "non-avaiable",
      stock: 0,
    })
      .then((res) => {
        this.getDataBarang();
        this.setState({ delModal: false });
      })
      .catch((err) => {
        console.log("gagal delete product", err);
      });
  };

  printBarang = () => {
    return this.props.products.map((item, index) => {
      if (this.state.selectedIndex === index) {
        return (
          <>
            <td>
              <Input
                type="text"
                placeholder="with a placeholder"
                defaultValue={item.id}
                disabled
              />
            </td>
            <td>
              <Input
                type="text"
                placeholder="with a placeholder"
                defaultValue={item.date}
                disabled
              />
            </td>
            <td>
              <Input
                type="text"
                placeholder="with a placeholder"
                innerRef={(e) => (this.nameEdit = e)}
                defaultValue={item.name}
              />
            </td>
            <td>
              <Input
                type="select"
                id="categoryAdd"
                innerRef={(e) => (this.categoryEdit = e)}
                defaultValue={item.category}
              >
                <option value="Electronic">Electronic</option>
                <option value="Handphone">Handphone</option>
                <option value="Furniture">Furniture</option>
                <option value="Beauty">Beauty</option>
                <option value="Fashion">Fashion</option>
                <option value="Food & Drink">Food & Drink</option>
              </Input>
            </td>
            <td>
              <Input
                type="text"
                placeholder="with a placeholder"
                innerRef={(e) => (this.serialEdit = e)}
                defaultValue={item.serial}
                disabled
              />
            </td>
            <td>
              <Input
                type="number"
                id="stockadd"
                placeholder="with a placeholder"
                innerRef={(e) => (this.stockEdit = e)}
                defaultValue={item.stock}
              />
            </td>
            <td>
              <Input
                type="number"
                id="priceadd"
                placeholder="with a placeholder"
                innerRef={(e) => (this.priceEdit = e)}
                defaultValue={item.price}
              />
            </td>
            <td>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="mt-2 mb-2"
                  onClick={() => this.btSave(item.id)}
                >
                  Save
                </Button>
                <Button
                  color="danger"
                  className="mt-2 mb-2"
                  onClick={() => this.setState({ selectedIndex: null })}
                >
                  Cancel
                </Button>
              </div>
            </td>
          </>
        );
      } else {
        return (
          <>
            {item.status === "avaiable" && (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.serial}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    color="primary"
                    className="mt-2 mb-2"
                    onClick={() => this.setState({ selectedIndex: index })}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    className="mt-2 mb-2"
                    onClick={() => this.deleteModal(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )}
          </>
        );
      }
    });
  };

  btModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  getSerial = () => {
    let serial = String(Date.now());
    serial = serial.slice(6, 13);
    return serial;
  };

  addDataBarang = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      today.getMonth() +
      "-" +
      today.getDate() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes() +
      "-" +
      today.getSeconds();
    let name = this.nameAdd.value;
    let serial = parseInt(this.getSerial());
    let stock = parseInt(this.stockAdd.value);
    let stockCheck = this.stockAdd.value;
    let category = this.categoryAdd.value;
    let price = parseInt(this.priceAdd.value);
    let priceCheck = this.priceAdd.value;
    let status = "avaiable";
    if (
      name === "" ||
      stockCheck === "" ||
      category === "" ||
      priceCheck === "" ||
      stock === 0
    ) {
      this.setState({
        visible: !this.state.visible,
        message: "Please input form field or stock must more than zero",
        color: "danger",
      });
      setTimeout(
        () =>
          this.setState({
            visible: !this.state.visible,
          }),
        3000
      );
    } else {
      Axios.post(`http://localhost:2021/products`, {
        name,
        date,
        serial,
        stock,
        category,
        price,
        status,
      })
        .then((res) => {
          this.getDataBarang();
          this.setState({
            selectedIndex: null,
            modalOpen: !this.state.modalOpen,
            visible: !this.state.visible,
            message: "Success Add Product",
            color: "success",
          });
          setTimeout(
            () =>
              this.setState({
                visible: !this.state.visible,
              }),
            3000
          );
        })
        .catch((err) => {
          console.log("gagal add product", err);
        });
    }
  };

  printModalAdd = () => {
    return (
      <Modal isOpen={this.state.modalOpen}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalBody>
          <Label for="name">Nama Barang</Label>
          <Input
            type="text"
            placeholder="with a placeholder"
            innerRef={(e) => (this.nameAdd = e)}
          />
          <Label for="Stok">Stok</Label>
          <Input
            type="number"
            id="stockadd"
            placeholder="with a placeholder"
            innerRef={(e) => (this.stockAdd = e)}
          />
          <Label for="Kategori">Kategori</Label>
          <Input
            type="select"
            id="categoryAdd"
            innerRef={(e) => (this.categoryAdd = e)}
          >
            <option value="Electronic">Electronic</option>
            <option value="Handphone">Handphone</option>
            <option value="Furniture">Furniture</option>
            <option value="Beauty">Beauty</option>
            <option value="Fashion">Fashion</option>
            <option value="Food & Drink">Food & Drink</option>
          </Input>
          <Label for="Harga">Harga</Label>
          <Input
            type="number"
            id="priceadd"
            placeholder="with a placeholder"
            innerRef={(e) => (this.priceAdd = e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addDataBarang}>
            Add Product
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  printModalConfirmation = () => {
    return (
      <Modal isOpen={this.state.delModal}>
        <ModalHeader>Delete Confirmation</ModalHeader>
        <ModalBody>
          <p>Are you sure want to change status to non-avaiable ?</p>
          <Button color="primary" onClick={() => this.deleteProduct()}>
            Yes
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => this.setState({ delModal: !this.state.delModal })}
          >
            Cancel
          </Button>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  };

  render() {
    return (
      <Row className="m-auto">
        <Col md="12">
          <Alert color={this.state.color} isOpen={this.state.visible}>
            {this.state.message}
          </Alert>
          <Button
            outline
            color="primary"
            className="mt-2 mb-2"
            onClick={() => this.btModal()}
          >
            Add Product
          </Button>
          {this.printModalAdd()}
          {this.printModalConfirmation()}
        </Col>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tanggal</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Serial Number</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <>{this.printBarang()}</>
          </tbody>
        </Table>
      </Row>
    );
  }
}

const mapToProps = ({ productReducers }) => {
  return {
    products: productReducers.products_list,
    status: productReducers.status,
  };
};

export default connect(mapToProps, { getBarangAction })(HomePage);
