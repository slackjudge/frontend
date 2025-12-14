import { useState } from "react";
import TeamDropDown from "@/components/signup/TeamDropDown";
import { apiFetch } from "@/api/client/httpClient";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@/components/common/CheckIcon"
import subLogo from '@/assets/images/sub_logo.png';


export default function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [baekjoonId, setBaekjoonId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isAlertAgreed, setIsAlertAgreed] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState("");

  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleCheckBaekjoonId = async () => {
    if (!baekjoonId.trim()) {
      setIdErrorMessage("백준 ID를 입력해주세요.");
      setIsIdChecked(false);
      return;
    }

    try {
      const res = await apiFetch<{
        baekjoonId: string;
        isBaekjoonId: boolean;
      }>(`/user/check?baekjoonId=${encodeURIComponent(baekjoonId)}`);

      if (res.data.isBaekjoonId) {
        setIsIdChecked(true);
        setIdErrorMessage("");
      } else {
        setIsIdChecked(false);
        setIdErrorMessage("입력하신 백준 ID가 올바르지 않습니다");
      }
    } catch {
      setIsIdChecked(false);
      setIdErrorMessage("백준 ID 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSignUp = async () => {
    if (!username.trim()) return alert("이름을 입력해주세요.");
    if (!baekjoonId.trim()) return alert("백준 ID를 입력해주세요.");
    if (!isIdChecked) return alert("백준 ID 확인이 필요합니다.");
    if (!teamName) return alert("반을 선택해주세요.");

    try {
      // await apiFetch("/user/signUp", {
      await apiFetch("/api/user/signUp", {
        method: "POST",
        body: JSON.stringify({
          username,
          baekjoonId,
          teamName,
          isAlertAgreed,
        }),
      });

      // 성공 시 이동
      navigate("/main/ranking", { replace: true });

    } catch (err) {
      console.error(err);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">

      <img
        src={subLogo}
        alt="sub logo"
        className="
          absolute top-6 left-6
          w-[120px]          /* 기본 크기 (모바일 기준) */
          sm:w-[150px]       /* 태블릿 이상 */
          md:w-[180px]       /* 데스크탑 이상 */
        "
      />

      <h1 className="text-[28px] md:text-[32px] font-medium mb-12">
        회원가입
      </h1>

      <div className="w-full max-w-[380px] flex flex-col gap-8">

        {/* 이름 */}
        <div className="flex items-center mb-4">
          <label htmlFor="username" className="w-[80px] text-[16px] font-medium text-black">
            이름
          </label>

          <div className="relative w-full">
            <input
              id="username"
              className="w-full h-[45px] border border-[#DADCE0] rounded-[4px] px-3 pr-10 placeholder:text-[#C4C8CC]"
              placeholder="이름을 입력해주세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {username && (
              <button
                onClick={() => setUsername("")}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  w-[16px] h-[16px] bg-[#D5D9DF] rounded-full
                  flex items-center justify-center text-white text-[10px]
                "
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 백준 ID */}
        <div className="w-full">
          {/* 기존 UI는 절대 변경 X */}
          <div className="flex items-center mb-4">
            <label htmlFor="baekjoonId" className="w-[80px] text-[16px] font-medium text-black">
              백준 ID
            </label>

            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1">
                <input
                  id="baekjoonId"
                  className={`
                    w-full h-[45px] rounded-[4px] px-3 pr-10 placeholder:text-[#C4C8CC]
                    ${idErrorMessage
                      ? "border border-red-500 animate-[shake_0.35s_ease-in-out]"
                      : "border border-[#DADCE0]"}
                  `}
                  placeholder="백준 ID를 입력해주세요."
                  value={baekjoonId}
                  onChange={(e) => {
                    setBaekjoonId(e.target.value);
                    setIsIdChecked(false);
                    setIdErrorMessage(""); // 입력 바뀔 때 에러 제거
                  }}
                />

                {/* X 버튼 */}
                {baekjoonId && (
                  <button
                    onClick={() => {
                      setBaekjoonId("");
                      setIsIdChecked(false);
                      setIdErrorMessage("");
                    }}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      w-[16px] h-[16px] bg-[#D5D9DF] rounded-full
                      flex items-center justify-center text-white text-[10px]
                    "
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 체크 또는 ID 확인 버튼 */}
              <div className="w-[45px] h-[45px] flex items-center justify-center">
                {isIdChecked && !idErrorMessage ? (
                  <CheckIcon />
                ) : (
                  <button
                    onClick={handleCheckBaekjoonId}
                    className="
                      w-full h-full bg-[#45539D] text-white text-[12px] rounded-[4px]
                      transition-all duration-200
                      hover:bg-[#39488A]
                      active:scale-95
                    "
                  >
                    ID 확인
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 에러 메시지 (UI 절대 안 깨짐) */}
          {idErrorMessage && (
            <p className="text-red-500 text-[13px] ml-[80px] mt-[-12px] mb-[8px]">
              {idErrorMessage}
            </p>
          )}
        </div>

        {/* 반 */}
        <div className="flex items-center mb-25">
          <label htmlFor="teamName" className="w-[80px] text-[16px] font-medium text-black">
            반
          </label>
          <TeamDropDown id="teamName" teamName={teamName} setTeamName={setTeamName} />
        </div>

        {/* Slack 알림 */}
        <div className="flex flex-col gap-3 mt-14">
          <label className="flex items-center gap-2 text-[14px] text-[#686F75]">
            <input
              type="checkbox"
              checked={isAlertAgreed}
              onChange={(e) => setIsAlertAgreed(e.target.checked)}
              className="w-[18px] h-[18px] border border-[#DADCE0] rounded"
            />
            <span>Slack 알림 동의</span>
          </label>

          <button
            onClick={handleSignUp}
            className="
              w-full h-[55px] bg-[#45539D] rounded-[8px]
              text-white font-bold text-[18px]
            "
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}