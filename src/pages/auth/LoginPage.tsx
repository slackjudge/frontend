import SlackLoginButton from "../../components/signup/SlackLoginButton";
import mainLogo from "../../assets/images/main_logo.png";

export const SLACK_CLIENT_ID = import.meta.env.VITE_SLACK_CLIENT_ID;
export const SLACK_REDIRECT_URI = import.meta.env.VITE_SLACK_REDIRECT_URI;

export default function LoginPage() {
    
  const handleSlackLogin = () => {
    window.location.href = `https://slack.com/openid/connect/authorize?scope=email openid profile&client_id=${SLACK_CLIENT_ID}&redirect_uri=${SLACK_REDIRECT_URI}&response_type=code`
  };

  return (
    <div className="
      min-h-screen flex flex-col items-center justify-center
      bg-white px-4
    ">
      {/* 로고 */}
      <img
        src={mainLogo}
        alt="Slack Judge"
        className="
          w-[240px] md:w-[280px] lg:w-[300px]
          mb-14 md:mb-16
        "
      />

      {/* 로그인 버튼 */}
      <SlackLoginButton onClick={handleSlackLogin} />
    </div>
  );
}