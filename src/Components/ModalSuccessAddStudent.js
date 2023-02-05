import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../style/style.css'

class ModalSuccessAddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    window.open('/', '_self').focus();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tambah Mahasiswa</ModalHeader>
          <ModalBody>
          Data Mahasiswa Sukses Ditambahkan
          </ModalBody>
          <ModalFooter>
            <button className="btn-modal" onClick={this.toggle}>OK</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalSuccessAddStudent;