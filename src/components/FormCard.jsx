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
        nomeCompleto: '',
        numeroDoCartao: '',
        email: '',
        cpf: '',
        rg: '',
        dataNascimento: '',
        cvv: '',
        tipoCartao: '',
        dataDeExpiracao: '',
    })
    const [status, setStatus] = useState('')

    const handleTipoCartaoChange = (e) => {
        setTipoCartao(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
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


    const generateRandomData = () => {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const randomRG = getRandomNumber(100000000, 999999999);
        const randomCPF = getRandomNumber(10000000000, 99999999999);
        const randomCardNumber = getRandomNumber(1000000000000000, 9999999999999999);
        const randomCVV = getRandomNumber(100, 999);

        setFormData({
            ...formData,
            rg: randomRG.toString(),
            cpf: randomCPF.toString(),
            numeroDoCartao: randomCardNumber.toString(),
            cvv: randomCVV.toString(),
        })

        console.log(formData.cpf)
    }

    return (
        <div className='container-fluid'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='mb-0'>Cadastrar Cartão</h2>
                    <img
                        src={card}
                        alt=""
                        width='70px'
                        height='70px'
                    />
                </div>
                <div className='card-body'>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nome Completo</Form.Label>
                                    <Form.Control type="text" placeholder="Nome Completo" className="input" name="nomeCompleto" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNumberCard">
                                    <Form.Label>Numero do cartão</Form.Label>
                                    <Form.Control type="text" placeholder="Numero do cartão" className="input" name="numeroDoCartao" onChange={handleInputChange} value={formData.numeroDoCartao} />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" className="input" name="email" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control type="text" placeholder="CPF" className="input" name="cpf" onChange={handleInputChange} value={formData.cpf} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formDateNascimento">
                                    <Form.Label>Data nascimento</Form.Label>
                                    <Form.Control type="date" placeholder="Data nascimento" className="input" name="dataNascimento" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDateNascimento">
                                    <Form.Label>RG</Form.Label>
                                    <Form.Control type="text" placeholder="RG" className="input" name="rg" onChange={handleInputChange} value={formData.rg}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>

                                <Form.Group controlId="formTipoCartao">
                                    <Form.Label>Tipo Cartão</Form.Label>
                                    <Form.Select value={tipoCartao} onChange={handleTipoCartaoChange} name="tipoCartao">
                                        <option value="nacional">Nacional</option>
                                        <option value="internacional">Internacional</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDateNascimento">
                                    <Form.Label>Cvv</Form.Label>
                                    <Form.Control type="text" placeholder="Cvv" className="input" name="cvv" onChange={handleInputChange} value={formData.cvv}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formDateNascimento">
                                    <Form.Label>Data de Expiração</Form.Label>
                                    <Form.Control type="date" className="input" name="dataDeExpiracao" onChange={handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <button
                            type='submit'
                            className='btn btn-success'
                        >
                            Cadastrar
                        </button>

                        <button
                            type="button"
                            onClick={generateRandomData}
                            className="btn btn-secondary"
                            id='generated'
                        >
                            Gerar dados aleatorio
                        </button>
                        {tipoCartao === 'internacional' && (
                            <p className='alert alert-danger'>
                                Cartão Internacional indisponível
                            </p>
                        )}
                        {status && (
                            <div className={`alert ${status.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
                                {status}
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}


export default FormCard;
