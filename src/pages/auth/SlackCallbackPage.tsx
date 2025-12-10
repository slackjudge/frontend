import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SlackCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const sendCodeToServer = async () => {
      try {
        const res = await fetch(`/api/oauth/login?code=${code}`, {
          method: "GET",
        });

        const data = await res.json();
        console.log("서버 응답:", data);

        if (!data.success) {
          console.log("error")
          // TODO: 에러 페이지나 로그인 페이지 이동 등의 처리
          return;
        }

        const { accessToken, refreshToken, registeredUser } = data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (!registeredUser) {
          navigate("/sign-up", {replace: true})
        } else {
          navigate("/main/ranking", {replace: true});
        }

      } catch (e) {
        console.error(e);
        // TODO: 에러처리
      }
    };

    sendCodeToServer();
  }, [code, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Slack Callback</h1>
      <p>받은 code: {code}</p>
      <p>로그인 처리 중입니다...</p>
    </div>
  );
}