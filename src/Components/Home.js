import React, { Component } from "react";
import { Container, Card, Button } from "reactstrap";
import { db } from "../config/firebase";
import "../style/style.css";
import { Table } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Loader from "./Loader";
import axios from "axios";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default class Home extends Component {
  state = {
    user: {},
    password: "",
    email: "",
    data: [],
    loading: false,
    location: "",
  };

  componentDidMount() {
    this.fetchdata();
    this.handleGetLocation();
    this.handleGetResponseLocation();
  }
  heandleGetLocation = async ()=>{
    const response = await axios.get(
      'https://ipapi.co/json');
    return response.data;
  }
  handleGetResponseLocation = async () =>{
    const response = await this.heandleGetLocation();
    const locat = response.city +", "+response.region;
    this.setState({ location : locat})
  }

  handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  };

  fetchdata = () => {
    this.setState({ loading: true });
    db.collection("students")
      .get()
      .then((docRef) => {
        const data = docRef.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        this.setState({ data });
        this.setState({ loading: false });
      });
  };

  deleteData = (id) => {
    db.collection("students")
      .doc(id)
      .delete()
      .then(() => {
        alert("Item successfully deleted!");
        console.log("Document successfully deleted!");
        this.fetchdata();
      })
      .catch((error) => {
        alert("Error removing item: ", error);
        console.error("Error removing document: ", error);
        this.fetchdata();
      });
  };

  render() {
    console.log(this.state.user);
    console.log(this.state.data, "data");
    return (
      <div>
        <Navbar value={true} />
        <Container className="container-home">
          <div className="d-flex bd-highlight">
            <div className="p-2 flex-grow-1 bd-highlight"></div>
            <div className="p-2 bd-highlight">
              <a href="/add-student" type="button" className="btn-add-product">
                Tambah Mahasiswa
              </a>
            </div>
          </div>
          <h2>Daftar Mahasiswa</h2>
          <Card>
            {!this.state.loading ? (
              <Table>
                <thead>
                  <tr>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Jenis Kelamin</th>
                    <th>Hobi</th>
                    <th>Kolom Komentar</th>
                    <th>Lokasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item) => {
                    return (
                      <tr key={item.id}>
                        <th width="300px">{item.nim}</th>
                        <td width="450px">{item.name}</td>
                        <td width="450px">{item.address}</td>
                        <td width="450px">{item.gender}</td>
                        <td width="450px">{item.hobby}</td>
                        <td width="450px">{item.comment}</td>
                        <td width="450px">{this.state.location}</td>
                        <td>
                          <Button
                            color="danger"
                            onClick={() => this.deleteData(item.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
          ) : (
            <div></div>
            )}
          </Card>
        </Container>
      </div>
    );
  }
}
