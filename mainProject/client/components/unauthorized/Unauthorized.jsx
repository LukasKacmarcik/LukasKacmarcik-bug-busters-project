import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  function redirectHome() {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  redirectHome();

  return <h1>Unauthorized you will be redirected home in 3s.</h1>;
};

export default Unauthorized;
