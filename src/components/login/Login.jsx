import { signInWithPopup } from "firebase/auth";
// Login.js

import { useDispatch } from "react-redux";
import styled from "styled-components";

import { auth, provider } from "../../firebase";
import { setUserLoginDetails } from "../../store/UserSlice";

/**
 * Login component handles user authentication using Google.
 * @returns {JSX.Element} - Login component.
 */
const Login = () => {
  const dispatch = useDispatch();

  /**
   * Handles user authentication with Google.
   * On successful authentication, sets user details in Redux state.
   * @async
   */
  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Sets user details in Redux state.
   * @param {Object} user - User object from authentication result.
   */
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Container>
      <Box>
        {/* <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F591%2F671%2Fpng-transparent-cloud-computing-logo-dedicated-hosting-service-clouds-blue-cloud-service.png&tbnid=RYabd8QXZtF9NM&vet=12ahUKEwjuqbuYo7iEAxWFKRAIHeEkDFEQMygkegUIARCoAQ..i&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dcloud%2BLogo&docid=WvslsgYWOqRC-M&w=920&h=614&q=cloud%20logo&ved=2ahUKEwjuqbuYo7iEAxWFKRAIHeEkDFEQMygkegUIARCoAQ" /> */}
        <svg
          height="100px"
          version="1.1"
          viewBox="0 0 32 32"
          width="100px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <desc />
          <defs />
          <g
            fill="none"
            id="Page-1"
            stroke="none"
            strokeWidth="3"
          >
            <g fill="#157EFB" id="icon-132-cloud">
              <path
                d="M26.8828633,15.3655101 C28.7132907,16.1085075 30,17.9035809 30,20 C30,22.7558048 27.7616745,25 25.0005601,25 L7.99943992,25 C5.23249418,25 3,22.7614237 3,20 C3,17.9491311 4.23965876,16.1816085 6.01189661,15.4115388 L6.01189661,15.4115388 C6.00400207,15.275367 6,15.1381509 6,15 C6,11.1340066 9.13400656,8 13,8 C15.6127573,8 17.8911816,9.43144875 19.0938083,11.5528817 C19.8206159,11.1987158 20.6371017,11 21.5,11 C24.1486546,11 26.3600217,12.8722494 26.8828633,15.3655101 Z"
                id="cloud"
              />
            </g>
          </g>
        </svg>
        <h3>BitCloud</h3>
        <Button onClick={handleAuth}>Get Started</Button>
        <div className="text">
          <p>
            A cloud-based storage service that enables users to store and access
            files online
          </p>
        </div>
      </Box>
      <ImageContainer>
        <img src="/login.gif" alt="Login" />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 10px;

  img {
    width: 80px;
    margin-bottom: 0.5rem;
    margin-top: 2rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: #646464;
  }

  .text {
    margin-top: auto;
    p {
      text-align: center;
      font-weight: 600;
      font-size: 12px;
      color: #646464;
      letter-spacing: 1px;
      margin-bottom: 1rem;

      svg {
        font-size: 14px;
      }
      a {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 800px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  appearance: button;
  width: 100%;
  max-width: 280px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-bottom: 2rem;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);

  &:hover {
    background-position: 100% 0;
  }
  &:focus {
    outline: none;
  }
  &:active {
    border-width: 4px 0 0;
  }
`;

export default Login;
