import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Image } from '@phosphor-icons/react';
import { Container, Form, InputGroup, Label, Input, LabelUpload, Select, SubmitButton, ErrorMessage } from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.number('Digite um valor como R$ 22,50').positive().required('Digite o preço do produto'),
    category: yup.object().required('Selecione a categoria do produto'),
    file: yup.mixed()
      .test('required', 'Selecione uma imagem do produto', (value) => {
        return value && value.length > 0;})
      .test('fileSize', 'O arquivo é muito grande. Máximo 3MB', (value) => {
        return value && value[0] && value[0].size <= 3000000;})
      .test('type', 'Tipo de arquivo inválido. Apenas WebP, PNG ou JPEG', (value) => {
        return value && value[0] && ['image/webp', 'image/png', 'image/jpeg'].includes(value[0].type);}),
    offer: yup.boolean().required('Selecione se o produto está em oferta'),
  })

export function NewProduct() {
  // Categorias
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function loadCategories(){
      const { data } = await api.get('/categories')
      console.log('Log: Categorias',data)
      setCategories(data)
    }
    loadCategories()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Opções para o campo de oferta
  const offerOptions = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ]
  // watch para monitorar o campo de arquivo
  const fileName = watch('file')?.[0]?.name

  // Função chamada quando o formulário é enviado com sucesso
  const onSubmit = async (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('category_id', data.category.id)
    formData.append('offer', data.offer)
    formData.append('file', data.file[0])

    await toast.promise(api.post('/products', formData),{
      pending: 'Enviando dados...',
      success: 'Produto cadastrado com sucesso!',
      error:   'Erro ao cadastrar o produto, tente novamente mais tarde.',
    })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>
        <InputGroup>
          <Label>Preço</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="R$ 0,00"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  field.onChange(value ? parseInt(value, 10) : '');
                }}
                value={field.value ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(field.value / 100) : ''}
              />
            )}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Em oferta?</Label>
          <Controller
            name="offer"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={offerOptions}
                placeholder="Selecione se está em oferta"
                value={offerOptions.find((opt) => opt.value === field.value)}
                onChange={(opt) => field.onChange(opt.value)}
              />
            )}
          />
        </InputGroup>
        <ErrorMessage>{errors?.offer?.message}</ErrorMessage>

        <InputGroup>
          <Label>Imagem</Label>
          <LabelUpload>
            <Image size={24} />
            <input
              type="file"
              accept="image/webp, image/png, image/jpeg"
              {...register('file')}
            />
            {fileName || 'Selecione uma imagem'}
          </LabelUpload>
        <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          {/* Controller para elementos não controlados, como o React Select */}
          <Controller name="category" control={control}
            render={({ field }) => (
            <Select
              {...field}
              options={categories}
              getOptionLabel={(categories) => categories.name}
              getOptionValue={(categories) => categories.id}
              isLoading={categories.length === 0}
              noOptionsMessage={() => 'Nenhuma categoria encontrada'}
              placeholder="Selecione uma categoria"
              menuPortalTarget={document.body}
            /> )}
          />
        </InputGroup>
        <ErrorMessage>{errors?.category?.message}</ErrorMessage>

        <SubmitButton type="submit">Adicionar Novo Produto</SubmitButton>
      </Form>
    </Container>
  );
}
