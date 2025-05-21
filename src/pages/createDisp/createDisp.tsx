import { Formik , Form , Field } from 'formik';
import * as Yup from 'yup';



const validationSchema = Yup.object().shape({
  disp: Yup.string().required('Необходимо ввести название диспетчерской'),
//   users: Yup.array().of(Yup.string()).min(1, 'Нужно хотя бы одного пользователя'),
//   objects: Yup.array().of(Yup.string()).min(1, 'Нужно хотя бы один объект')
});

const CreateDispPage = () => {

    const initialValues = {
    disp: '',
    active:true,
    users: [],
    objects: []
  };

   const handleSubmit = async (values:any, actions:any) => {
    console.log(values);
    // try {
    //   await createForm({ variables: { input: values } });
    //   alert("Форма успешно отправлена!");
    //   actions.setSubmitting(false);
    // } catch (err) {
    //   console.error(err.message);
    //   alert("Ошибка отправки формы");
    //   actions.setSubmitting(false);
    // }
  };

    return (
     <div className='col-lg-5 col-sm-12'>
      <div className='bgWhite rounded16 p-4 shadow'>
        <div className='flexHoriz w-100 mb-4'>
          <h3 className="font18b mb-0">Создание диспетчерской</h3>
          </div>
     <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
       
        <Form>
          <div className ="flexHoriz justify-content-between mt-3">
            <div className="posRel h56 rounded-lg w-100">
      
        <Field name="disp" type="text" className="DispName" />
        <label className="transp backLab" htmlFor="disp">Название диспетчерской</label>
        </div>
        </div>
         <div>       
        <Field name="active" id="active" type="checkbox" className="checkbox-item" /> 
         <label htmlFor="active" className="mb-3">             
        Активна
        </label>     
        </div>
          {/*  <Field name="disp" component={Disp} />
         <Disp field={getFieldProps('disp')} form={{ touched, errors }} /> */}
          {/* <Field component={Users} label="Пользователи"/>
          <Field component={Objects} label="Объекты"/> */}
          <button type="submit" className="btn btn1 h56 mr-2">
         <strong>Сохранить изменения</strong>
          </button>
        </Form>
    
    </Formik>
    </div>
    </div>
    
    );
}
export default CreateDispPage;