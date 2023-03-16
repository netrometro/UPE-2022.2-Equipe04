import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
    username: string;
    password: string;
}

export default function LoginForm() {
    return (
      <div>
        
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}

        >
          <div className="login_box">
            <h1 className='title'>Entrar</h1>
            <Form>
              <div className="mb-3">
                <Field className="login_box_input" id="username" name="username" placeholder="Nome" aria-describedby="usernameHelp" />
              </div>
    
              <div className="mb-3">
                <Field className="login_box_input" id="password" name="password" placeholder="Senha" type="password" />
              </div>

              <button type="submit" className="login_button">Entrar</button>
            </Form>
          </div>
        </Formik>
      </div>
    );
}