// Imagens
import Logo from "../../assets/logo.svg";

import {
    Container,
    Form,
    InputContainer,
    LeftContainer,
    RigthContainer,
    Title,
    Link,
} from "./styles.js";

// Api Axios
import { api } from "../../services/api.js";

// Components: Button
import { Button } from '../../components/Button/index.jsx';

// Toastify - usameros a promise para exibir o toast
import { toast } from 'react-toastify';

// useNavigate - React Router Dom
import { useNavigate } from "react-router-dom";

// Hook Form e Yup
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


export function Register() {

    // Var useNavigate
    const navigate = useNavigate();

    // Validação Yup
    const schema = yup.object({
        name: yup.string().required('O nome é obrigatório'),
        email: yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
        password: yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .required('Digite a senha'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
            .required('Confirme sua senha'),
    })
        .required();

    // Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });
    console.log(errors)

    // Função de Login com Axios na rota session(Login)
    const onSubmit = async (data) => {

        try {
            const { status } = await api.post('/users',
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
                {
                    validateStatus: () => true
                }
            );
            if (status === 200 || status === 201) {
                toast.success('Conta criada com sucesso!')
                setTimeout(() => {
                    // Navega para a tela de Login
                    navigate('/login')
                }, 2000)
            } else if (status === 400) {
                toast.error('Email já cadastrado')
            } else {
                throw new Error()
            }

        } catch (error) {
            toast.error("Falha no sitema Tente novamente")
        }

    };



    // Retorno
    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburger" />
            </LeftContainer>
            <RigthContainer>
                <Title>
                    Criar Conta
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit" >Cadastrar</Button>
                </Form>

                <p>
                    Já possui conta? <Link to="/login">Clique aqui</Link>
                </p>
            </RigthContainer>
        </Container>
    );
}