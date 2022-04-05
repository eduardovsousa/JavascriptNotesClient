import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Label, Section, Help } from "rbx";
import { Navigate } from "react-router-dom";
import UsersSerivces from '../../../../services/users'

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Redirect para login se estiver como falso
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    // Erro para mostrar caso tenha algo errado 
    const [error, setError] = useState(false);

    //método que usará a API axios para o register
    const HandleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            //Se tudo der certo, o usuário será redirecionado para o login
            const user = await UsersSerivces.register({ name: name, email: email, password: password })
            setRedirectToLogin(true)
        } catch (error) {
            //Caso dê errado, aparecerá um erro
            setError(true)
        }
    }


    //Verificando se o redirect é ttrue
    if(redirectToLogin)
    return <Navigate to={{pathname: "/login"}}/>

    return (
        <Fragment>
            <Column.Group centered>
                {/* Formulário com o método para login */}
                <form onSubmit={HandleSubmit}>
                    <Column size={12}>
                        {/* Campo */}
                        <Field>
                            {/* Linha */}
                            <Label size="small">Name:</Label>
                            {/* Controle  */}
                            <Control>
                                {/* Inserção de dados */}
                                <Input
                                    type="name"
                                    required
                                    name="name"
                                    //Controlando o input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column>
                                        <a className="button is-white has-text-custom-purple"
                                            //Redirecionando para o modo logado caso dê certo
                                            onClick={e => setRedirectToLogin(true)}>Login or</a>
                                    </Column>
                                    <Column>
                                        <Button color="custom-purple" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        {/* Mensagem de error caso aconteça divergência de usuário/senha  */}
                        { error && <Help color="danger">Email or Password invalid</Help> }
                    </Column>
                </form>
            </Column.Group>
        </Fragment>
    )
}

export default RegisterForm;