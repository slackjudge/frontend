import SlackLoginButton from "@/components/signup/SlackLoginButton";
import WorkSpaceButton from "@/components/signup/WorkSpaceButton";
import mainLogo from "@/assets/images/main_logo.png";

export const SLACK_CLIENT_ID = import.meta.env.VITE_SLACK_CLIENT_ID;
export const SLACK_REDIRECT_URI = import.meta.env.VITE_SLACK_REDIRECT_URI;

const INVITE_URL =
  "https://join.slack.com/t/slackjudge/shared_invite/zt-3jvozgq6d-~pNce8kQdm6SFy4InCmryA";

export default function LoginPage() {
    
  const handleSlackLogin = () => {
    window.location.href = `https://slack.com/openid/connect/authorize?scope=email openid profile&client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_REDIRECT_URI}&response_type=code`
  };

    const handleWorkSpace = () => {
     window.open(INVITE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img
        src={mainLogo}
        alt="Slack Judge"
        className="w-[240px] md:w-[280px] lg:w-[300px] mb-14 md:mb-16"
      />

      <div className="w-full flex flex-col items-center gap-4">
        <WorkSpaceButton onClick={handleWorkSpace} />
        <SlackLoginButton onClick={handleSlackLogin} />
      </div>

      <div className="w-[400px] md:w-[480px] max-w-[85%] text-center text-sm text-gray-400 leading-relaxed">
        워크스페이스에 가입한 후,  로그인을 진행해주세요.
      </div>
    </div>
  );
}