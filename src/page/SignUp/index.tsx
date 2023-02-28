import React from 'react';
import { BannerLogin } from '../../components/BannerLogin/BannerLogin';
import { ContainerStyled } from '../../components/ContainerStyled';
import Form from '../../components/Form';
import { FormStyled } from '../../components/FormStyled';

const SignUp = () => {
  return (
    <>        
        <React.Fragment>
            <ContainerStyled>
                <BannerLogin/>
                <FormStyled>
                    <Form mode='signup'/>
                </FormStyled>
            </ContainerStyled>
        </React.Fragment>
    </>
  );
};

export default SignUp;