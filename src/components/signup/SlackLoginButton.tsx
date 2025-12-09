import React from "react";
import slackLogo from "../../assets/images/slack.png";

interface Props {
  onClick: () => void;
}

const SlackLoginButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Slack으로 로그인하기"
      className="
        flex items-center justify-center gap-3
        w-[400px] md:w-[480px] max-w-[85%] h-[60px]
        bg-white border border-gray-300 rounded-xl

        shadow-sm
        hover:shadow-md hover:bg-gray-50
        active:shadow-sm active:scale-[0.97]

        transition-all duration-200 ease-out
        select-none
      "
    >
      <img
        src={slackLogo}
        alt="Slack Logo"
        className="h-[14px] w-auto md:h-[16px]"
      />

      <span className="text-gray-800 text-lg md:text-xl font-medium tracking-tight">
        Slack으로 시작하기
      </span>
    </button>
  );
};

export default SlackLoginButton;