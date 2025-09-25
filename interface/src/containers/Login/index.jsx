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
} from "./styles";

// Api Axios
import { api } from "../../services/api";

// Components: Button
import { Button } from '../../components/Button/index.jsx';

// Toastify - usameros a promise para exibir o toast
import { toast } from 'react-toastify';

//React Router Dom - Use Navigate: redireciona
import { useNavigate } from "react-router-dom";

// Hook Form e Yup
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// Hook de Contexto do Usuário
import { useUser } from "../../hooks/UserContext.jsx";

export function Login() {

    // useNavigate
    const navigate = useNavigate();
    // Contexto do Usuário
    const { putUserData } = useUser();


    // Validação Yup
    const schema = yup.object({
        email: yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
        password: yup.string()
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .required('Digite a senha'),
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

        const {
            data: userData
        } = await toast.promise(

            api.post('/session', {
                email: data.email,
                password: data.password,
            }),
            // Informações do toast
            {
                pending: 'Carregando seus dados... 🧑‍🏭',
                success: {
                    render() {
                        setTimeout(() => {
                            if (userData?.admin) {
                                navigate('/admin/pedidos')
                            } else {
                                navigate('/')
                            }
                        }, 2000);
                    return 'Login efetuado com sucesso!🎉';
                    },
                },
                error: 'E-mail ou senha inválidos! 😥'
            }
        )
        // Salvando o token do usuário que logou no localStorage
        // localStorage.setItem('devburguer:token', token);
        // Salando os dados do usuário no localStorage
        putUserData(userData);
    };



    // Retorno
    return (
        <>
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburger" />
            </LeftContainer>
            <RigthContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" >Entrar</Button>
                </Form>

                <p>
                    Não possui conta? <Link to="/cadastro">Clique aqui</Link>
                </p>
            </RigthContainer>
        </Container>
        </>
    );
}