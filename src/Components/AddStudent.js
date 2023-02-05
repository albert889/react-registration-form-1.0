import React, { Component } from 'react'
import Navbar from './Navbar'
import { db } from '../config/firebase'
import ModalSuccessAddStudent from './ModalSuccessAddStudent'
import '../style/style.css'

export default class AddStudent extends Component {
    state = {
        nim: '',
        name: '',
        address: '',
        gender: '',
        hobby: '',
        comment: "",
        errorMessage: "",
        isError: false,
        isRadioMaleChecked: false,
        isRadioFemaleChecked: false,
    }
    render() {
        const handleAddStudent = (event) => {
            event.preventDefault()
            if (this.state.gender === "") {
                this.setState({ isError: true, errorMessage: "Semua inputan belum terisi" })
            } else {
                this.setState({ isError: false, errorMessage: "" })
                db.collection("students").add({
                    nim: this.state.nim,
                    name: this.state.name,
                    address: this.state.address,
                    gender: this.state.gender,
                    hobby: this.state.hobby,
                    comment: this.state.comment
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        this.setState({ isSuccessAddStudent: true })
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                        this.setState({ isSuccessAddStudent: false })
                    });
            }
        };
        const handleClearData = () => {
            this.setState({
                nim: '',
                name: '',
                address: '',
                gender: '',
                hobby: '',
                comment: '',
                errorMessage: '',
                isError: false,
                isRadioMaleChecked: false,
                isRadioFemaleChecked: false,
            })
        }
        const onChangeRadioButton = (e) => {
            if(e.target.value === 'Perempuan'){
                this.setState({isRadioFemaleChecked : true })
            }else if(e.target.value === 'Laki-laki'){
                this.setState({isRadioMaleChecked : true })
            }else{
                this.setState({isRadioFemaleChecked : false, isRadioMaleChecked : false })
            }
            this.setState({ gender: (e.target.value), isError: false, errorMessage: ""})
        }

        return (
            <div>
                <Navbar value={false} />
                <div className="container mt-3">
                    <h1 className="fw-bold">Tambah Mahasiswa</h1>
                    <form onSubmit={handleAddStudent} onReset={handleClearData}>
                        {this.state.isError ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        ) : null}
                        <div className="mb-2">
                            <label className="form-label">NIM</label>
                            <input type="number" value={this.state.nim} placeholder="NIM" autoFocus="" className="form-control shadow-none" id="nim" onChange={(e) => this.setState({ nim: (e.target.value) })} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Nama</label>
                            <input type="text" value={this.state.name} placeholder="Nama" className="form-control shadow-none" id="name" onChange={(e) => this.setState({ name: (e.target.value) })} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Alamat</label>
                            <input type="text" value={this.state.address} placeholder="Alamat" className="form-control shadow-none" id="address" onChange={(e) => this.setState({ address: (e.target.value) })} required />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Jenis Kelamin</label>
                            <div >
                                <input type="radio" checked={this.state.isRadioMaleChecked} onChange={(e) => onChangeRadioButton(e)} value="Laki-laki" name="gender" /> Laki-Laki
                                <input type="radio" checked={this.state.isRadioFemaleChecked} onChange={(e) => onChangeRadioButton(e)} value="Perempuan" name="gender" style={{ marginLeft: '20px' }} /> Perempuan
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Hobi</label>
                            <textarea className="form-control shadow-none" value={this.state.hobby} id="hobby" rows="3" onChange={(e) => this.setState({ hobby: (e.target.value) })} required></textarea>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Kolom Komentar</label>
                            <textarea className="form-control shadow-none" value={this.state.comment} id="hobby" rows="3" onChange={(e) => this.setState({ comment: (e.target.value) })} required></textarea>
                        </div>
                        <div className="row mb-2 container-btn">
                            <div className="col-3">
                                <button type='reset' className="btn-clear">Clear</button>
                            </div>
                            <div className="col-3 ">
                                <button type="submit" className="btn-save">Submit</button>
                            </div>
                        </div>
                        {this.state.isSuccessAddStudent ? (
                            <ModalSuccessAddStudent />
                        ) : null}
                    </form>
                </div>
            </div>
        )
    }
}