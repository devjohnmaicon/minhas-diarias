import React, { useState } from "react";
import styled from "styled-components";
import { Store } from "../contexts/GlobalContext";
import { getDate, maskReal } from "../utils/inputMasks";

const initialValues = {
  type: "1",
  value: 0,
  user_id: "b24c471e-47cb-49a2-9ffa-aac10ce9fdb6",
  date: `${getDate()}`,
};

export const Modal = ({ addDaily }) => {
  const [daily, setDaily] = useState(initialValues);

  const { toggleModal } = Store();

  const handleChange = (e) => {
    const { name, value } = e.target;

    name === "value"
      ? setDaily({ ...daily, [name]: parseFloat(value) })
      : setDaily({ ...daily, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    daily.type === "2"
      ? addDaily({ ...daily, value: -daily.value })
      : addDaily(daily);

    toggleModal();
  };

  return (
    <ContainerModal>
      <Form onSubmit={handleSubmit}>
        <h2>Novo Lançamento</h2>

        <div className="box-form">
          <label htmlFor="">Tipo</label>
          <select name="type" value={daily.type} onChange={handleChange}>
            <option value="1">Diária</option>
            <option value="2">Pagamento</option>
          </select>
        </div>

        <div className="box-form">
          <label htmlFor=""> R$ / Valor </label>
          <input
            name="value"
            type="number"
            placeholder="60"
            className="input-value"
            onChange={handleChange}
          />
        </div>
        <div className="box-form">
          <label htmlFor="">Data</label>
          <input
            name="date"
            type="date"
            placeholder="12/12/2012"
            className="input-value"
            value={daily.date}
            onChange={handleChange}
          />
        </div>

        <div className="box-form">
          <label htmlFor="">Descrição</label>
          <textarea
            name="description"
            cols="30"
            rows="6"
            className="input-text_area"
            onChange={handleChange}
          />
        </div>

        <div className="box-buttons">
          <button type="submit" className="btn-submit">
            Salvar
          </button>
          <button type="button" className="btn-cancel" onClick={toggleModal}>
            Cancelar
          </button>
        </div>
      </Form>
    </ContainerModal>
  );
};

export const ContainerModal = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  background-color: #171717;
  height: 95%;
  width: 70%;
  min-height: 500px;
  min-width: 300px;
  border-radius: 2%;
  box-shadow: 0px 10px 13px -7px #000000;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 1.4rem 1rem 0;

  h2 {
    font-size: 1.5rem;
  }

  .box-form {
    display: flex;
    flex-direction: column;
    margin-top: 0.8rem;

    label {
      margin-bottom: 0.4rem;
    }

    select {
      font-size: 1.4rem;
      background-color: #ededed;
    }

    .input-value {
      font-size: 1.4rem;
      padding: 0.5rem;
      background-color: #ededed;
    }

    .input-text_area {
      resize: none;
      border-radius: 5px;
      padding: 0.6rem;
      font-size: 1.2rem;
      background-color: #ededed;
    }
  }

  .box-buttons {
    display: flex;
    justify-content: center;
    gap: 10%;
    width: 100%;
    margin: 1rem 0;

    .btn-submit {
      padding: 0.8rem;
      background-color: #bd4b4b;
      color: #ededed;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
    }

    .btn-cancel {
      background-color: transparent;
      cursor: pointer;
      font-size: 1rem;
      color: #fff;
    }
  }
`;
