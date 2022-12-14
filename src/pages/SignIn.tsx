import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthButton, AuthInput, TitleTypography } from "../ui";
import { todoApi } from "../utils/apis";
import { ApiError } from "../utils/interfaces";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signup, setSignup] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const validation = useCallback(() => {
    if (email.match(/@/g) && password.length >= 8) setIsValid(true);
    else setIsValid(false);
  }, [email, password]);

  const onSign = async () => {
    let res: AxiosResponse;
    try {
      res = signup
        ? await todoApi.signUp(email, password)
        : await todoApi.signIn(email, password);
      localStorage.setItem("token", res.data.access_token);
      navigate("/todo");
    } catch (err) {
      const e = err as AxiosError;
      const errorData = e.response?.data as ApiError;
      if (e.isAxiosError) {
        alert(errorData.message);
      } else {
        alert("문제가 발생했습니다." + err);
      }
    }
  };

  useEffect(() => {
    validation();
  }, [email, password, validation]);

  return (
    <div>
      <TitleTypography>TODO</TitleTypography>
      <form>
        <AuthInput
          type="text"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!signup ? (
          <AuthButton type="button" onClick={onSign} disabled={!isValid}>
            로그인
          </AuthButton>
        ) : (
          <AuthButton type="button" onClick={onSign} disabled={!isValid}>
            회원가입
          </AuthButton>
        )}
      </form>
      {!signup && (
        <button onClick={() => setSignup(true)}>여기를 클릭해 회원가입❤</button>
      )}
    </div>
  );
};

export default SignIn;
