import "./login.css";
import imgLogin from "../../Assets/cart-shopping-fast.svg";
import imgBackground from "../../Assets/BG.png";

export const Login = () => {
  return (
    <div className="loginDesing">
      <img
        src={imgBackground}
        alt="Imagen de fondo"
        className="ImagenBackgroud"
      />
      <div className="loginContainer">
        <img src={imgLogin} alt="Imagen Login" />
        <h1>LOGIN</h1>
        <form>
          <input type="text" placeholder="USERNAME" />
          <input type="password" placeholder="PASSWORD" />
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  );
};
