import React from 'react';
import { BannerLogin } from '../../components/BannerLogin/BannerLogin';
import { ContainerStyled } from '../../components/ContainerStyled';
import Form from '../../components/Form';
import { FormStyled } from '../../components/FormStyled';

const Login = () => {
  return (
    <React.Fragment>
        <ContainerStyled>
            <BannerLogin/>
            <FormStyled>
                <Form mode='login'/>
            </FormStyled>
        </ContainerStyled>
    </React.Fragment>
  );
};

export default Login;
