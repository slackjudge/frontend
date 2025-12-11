import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiFetch } from "@/api/client/httpClient";

export default function SlackCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    (async () => {
      try {
        const res = await apiFetch<{
          accessToken: string;
          refreshToken: string;
          registeredUser: boolean;
        }>(`/oauth/login?code=${code}`, {
          method: "GET",
        });

        const { accessToken, refreshToken, registeredUser } = res.data;

        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // 회원가입 완료한 사용자 → 랭킹 페이지 / 신규 회원 → 회원가입 페이지
        navigate(registeredUser ? "/main/ranking" : "/sign-up", {
          replace: true,
        });
      } catch (err) {
        console.error("Slack login error:", err);
        navigate("/", { replace: true });
      }
    })();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#45539D] border-t-transparent"></div>
    </div>
  );
}