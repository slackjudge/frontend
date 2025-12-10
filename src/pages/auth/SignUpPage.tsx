import { useState } from "react";
import TeamDropDown from "../../components/signup/TeamDropDown"

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [baekjoonId, setBaekjoonId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isAlertAgreed, setIsAlertAgreed] = useState(false);

  return (
    <div
      className="
      min-h-screen flex flex-col items-center justify-center
      bg-white px-4
    "
    >
      {/* 제목 */}
      <h1 className="text-[28px] md:text-[32px] font-medium mb-12">
        회원가입
      </h1>

      {/* 입력 form 컨테이너 */}
      <div className="w-full max-w-[380px] flex flex-col gap-8">

        {/* 이름 */}
        <div className="flex items-center mb-4">
            <label className="w-[80px] text-[16px] font-medium text-black">
                이름
            </label>
        
            <div className="relative w-full">
                <input
                className="w-full h-[45px] border border-[#DADCE0] rounded-[4px] px-3 pr-10
                placeholder:text-[#C4C8CC]
                "
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
        <div className="flex items-center mb-4">
            <label className="w-[80px] text-[16px] font-medium text-black">
                백준 ID
            </label>

            <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1">
                <input
                    className="w-full h-[45px] border border-[#DADCE0] rounded-[4px] px-3 pr-10
                    placeholder:text-[#C4C8CC]
                    "
                    placeholder="백준 ID를 입력해주세요."
                    value={baekjoonId}
                    onChange={(e) => setBaekjoonId(e.target.value)}
                />

                {baekjoonId && (
                    <button
                    onClick={() => setBaekjoonId("")}
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

                <button
                className="
                    w-[52px] h-[45px] bg-[#45539D] text-white text-[12px] rounded-[4px]
                "
                >
                ID 확인
                </button>
            </div>
        </div>

        {/* 반 */}
        <div className="flex items-center mb-25">
            <label className="w-[80px] text-[16px] font-medium text-black">
                반
            </label>
            <TeamDropDown teamName={teamName} setTeamName={setTeamName} />
        </div>

        <div className="flex flex-col gap-3 mt-14">
            <label className="flex items-center gap-2 text-[14px] text-[#686F75]">
                <input
                type="checkbox"
                checked={isAlertAgreed}
                onChange={(e) => setIsAlertAgreed(e.target.checked)}
                className="w-[18px] h-[18px] border border-[#DADCE0] rounded"
                />
                Slack 알림 동의
            </label>

            <button
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