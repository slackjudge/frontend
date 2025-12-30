import React from "react";
import slackLogo from "@/assets/images/sub_logo.png";

interface Props {
  onClick: () => void;
}

const WorkSpaceButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="워크스페이스 가입하기"
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
        Workspace 가입하기
      </span>
    </button>
  );
};

export default WorkSpaceButton;