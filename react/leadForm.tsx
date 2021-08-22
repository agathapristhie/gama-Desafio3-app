/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
import React from 'react'

import callAPI from  './callApi'

import newId from './newId'

import { useForm } from 'react-hook-form';

import { Form } from './components/Form/stylesForm'

// eslint-disable-next-line react/prefer-stateless-function
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line react/prefer-stateless-function

const leadForm: React.FC = () => { //formulário para cadastro de leads

  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true }); //usando o hook useForm

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility

  const onSubmit = handleSubmit((clientdata) =>{ //ao submeter os dados, eles são armazenados localmente e é feita uma chamada para API gateway, que armazena os dados no dynamo.db
    const clientStore = JSON.stringify(clientdata);
    localStorage.setItem('@client', clientStore);
    alert(JSON.stringify(clientdata));

    const id = newId();
    callAPI(id, clientdata.name, clientdata.email, clientdata.phone);
    return (<div>Cadastro realizado com sucesso! Você ganhou R$12,00 em compras!!!</div>)
    })

    return (
      <div key="leadForm" className="leadFormContainer">
        <Form method="post" action="" onSubmit={onSubmit}>
          <h1>Cadastro</h1>

          <p>
            <input
                      {...register("Nome", { required: "Por favor, insira seu nome." })}
                      />
          </p>

          <p>
            <input
                      {...register("E-mail", { required: "Por favor, insira seu e-mail." })}
                      />
          </p>

          <p>
          <input
                      {...register("Telefone", { required: "Por favor, insira seu telefone." })}
                      />
          </p>

          <p>
            <button type="submit"> Cadastrar </button>
          </p>
        </Form>
      </div>
    )
  }


export default leadForm
