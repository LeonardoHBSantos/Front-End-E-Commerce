import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { changeInputs } from '../services/ChangeFuntions';
import { clickBtnSubmitCheckout } from '../services/ClickFunctions';

class Form extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    customerPhone: '',
    customerCep: '',
    customerAddress: '',
    error: false,
    redirectToHome: false,
  };

  handleInputChange = changeInputs.bind(this);

  clickBtnSubmitcheckout = clickBtnSubmitCheckout.bind(this);

  render() {
    const { name,
      cpf,
      email,
      customerPhone, customerCep, customerAddress, error, redirectToHome } = this.state;

    if (redirectToHome) {
      localStorage.clear();
      return <Redirect to="/" />;
    }

    return (
      <form>
        <h3>Informações do comprador:</h3>
        <div>
          <label htmlFor="customerName">
            Nome completo:
            <input
              type="text"
              name="name"
              id="customerName"
              data-testid="checkout-fullname"
              onChange={ this.handleInputChange }
              value={ name }
            />
          </label>
        </div>
        <div>
          <label htmlFor="customerCpf">
            CPF:
            <input
              type="text"
              name="cpf"
              id="customerCpf"
              data-testid="checkout-cpf"
              value={ cpf }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              id="customerEmail"
              data-testid="checkout-email"
              value={ email }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Telefone:
            <input
              type="tel"
              name="customerPhone"
              id="customerPhone"
              data-testid="checkout-phone"
              value={ customerPhone }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            CEP:
            <input
              type="text"
              name="customerCep"
              id="customerCep"
              data-testid="checkout-cep"
              value={ customerCep }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <div>
          <label>
            Endereço:
            <input
              type="text"
              name="customerAddress"
              id="customerAddress"
              data-testid="checkout-address"
              value={ customerAddress }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <div>
          <h3>Método de pagamento</h3>
          <div>
            <label>
              Boleto
              <input
                type="radio"
                name="paymentMethod"
                id="ticketPayment"
                data-testid="ticket-payment"
                value="Boleto"
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
          <div>
            <label>
              Visa
              <input
                type="radio"
                name="paymentMethod"
                id="visaPayment"
                data-testid="visa-payment"
                value="Visa"
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
          <div>
            <label>
              Mastercard
              <input
                type="radio"
                name="paymentMethod"
                id="masterPayment"
                data-testid="master-payment"
                value="MasterCard"
                onChange={ this.handleInputChange }
              />

            </label>
          </div>
          <div>
            <label>
              Elo
              <input
                type="radio"
                name="paymentMethod"
                id="eloPayment"
                data-testid="elo-payment"
                value="Elo"
                onChange={ this.handleInputChange }
              />
            </label>
          </div>
        </div>
        {error && <p>Campos inválidos</p>}
        <button
          onClick={ this.clickBtnSubmitcheckout }
        >
          Realizar pagamento

        </button>
      </form>
    );
  }
}

export default Form;
