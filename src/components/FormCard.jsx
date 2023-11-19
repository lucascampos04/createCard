// eslint-disable-next-line no-unused-vars
import '@fontsource/chewy';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import '../public/css/FormStyle.css';
import card from "../public/img/sem-contato.png";

function FormCard() {
    const [tipoCartao, setTipoCartao] = useState('')
    const [formData, setFormData] = useState({
        nome: '',
        numeroDoCartao: '',
        email: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
    })
    const [status, setStatus] = useState('')

    const handleTipoCartaoChange = (e) => {
        setTipoCartao(e.target.value)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData,
        [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:8080/api/transactions/register/validated", formData);
            setStatus(response.data);
            console.log("Cartão cadastrado com sucesso ", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar o cartão ", error.message);
        }
    };

    return (
        <div className='container-fluid'>
            <Form onSubmit={handleSubmit}>
                <div className='title-container '>
                    <h2>Cadastrar Cartão</h2>
                    <img src={card} alt=""
                        width='70px'
                        height='70px'
                    />
                </div>
                

                <Row>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control type="text" placeholder="Nome Completo" className="input" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formNumberCard">
                            <Form.Label>Numero do cartão</Form.Label>
                            <Form.Control type="text" placeholder="Numero do cartão" className="input" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" className="input" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" placeholder="CPF" className="input" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formDateNascimento">
                            <Form.Label>Data nascimento</Form.Label>
                            <Form.Control type="date" placeholder="Data nascimento" className="input" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formTipoCartao">
                            <Form.Label>Tipo Cartão</Form.Label>
                            <Form.Select value={tipoCartao} onChange={handleTipoCartaoChange}>
                                <option value="nacional">Nacional</option>
                                <option value="internacional">Internacional</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formDateNascimento">
                            <Form.Label>RG</Form.Label>
                            <Form.Control type="text" placeholder="RG" className="input" />
                        </Form.Group>
                    </Col>
                    
                </Row>
                <button
                    type='submit'
                    className='btn btn-success'
                >
                    Cadaster
                </button>

                {tipoCartao === 'internacional' && (
                    <p className='alert alert-danger'>
                        cartão Internacional indisponivel
                    </p>
                )}

                {status && (
                    <div className={`alert ${status.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
                        {status}
                    </div>
                )

                }
            </Form>
        </div>

    );
}

export default FormCard;
