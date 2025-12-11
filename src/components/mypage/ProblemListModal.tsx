import React from "react";
import { Problem } from "../../types/mypage";
import { getTierImageUrl } from "../../constants/tierMap";

/**
 * ProblemListModal 컴포넌트의 Props 타입
 */
interface ProblemListModalProps {
    /** 모달 열림/닫힘 상태 */
    isOpen: boolean;
    /** 모달 닫기 함수 */
    onClose: () => void;
    /** 표시할 날짜 문자열 (예: "2025-12-05") */
    date: string;
    /** 해당 날짜에 푼 문제 목록 */
    problems: Problem[];
}

/**
 * 문제 아이템의 티어 이미지를 렌더링하는 헬퍼 함수
 * - 티어 이미지가 없을 경우 대체 UI 표시
 * 
 * @param tierLevel 티어 레벨 (0-30)
 * @returns 티어 이미지 또는 대체 div 요소 (React 요소)
 */
const renderProblemTierImage = (tierLevel: number): React.ReactElement => {
    const tierImageUrl = getTierImageUrl(tierLevel);
    
    if (tierImageUrl) {
        return (
            <img 
                src={tierImageUrl} 
                alt={`Tier Level ${tierLevel}`} 
                className="w-6 h-6"
            />
        );
    }
    
    return <div className="w-6 h-6 bg-gray-200 rounded"></div>;
};

/**
 * 외부 링크 아이콘 SVG 컴포넌트
 * - 재사용 가능한 아이콘 컴포넌트
 */
const ExternalLinkIcon = () => (
    <svg 
        className="w-4 h-4 text-gray-400 ml-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
        />
    </svg>
);

/**
 * 문제 목록 모달 컴포넌트
 * - 선택한 날짜에 푼 문제 목록을 표시
 * - 각 문제는 백준 링크로 연결됨
 */
export default function ProblemListModal(
    { isOpen, onClose, date, problems }: Readonly<ProblemListModalProps>
) {
    if (!isOpen) return null;

    return (
        <button
            type="button"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-label="모달 닫기 (배경)"
            tabIndex={0}
            style={{ outline: "none" }}
        >
            <div 
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
                onKeyDown={e => {
                    // Prevent propagation for keyboard events just like mouse click
                    e.stopPropagation();
                }}
                tabIndex={-1} // make it focusable, but not in the tab order normally
            >
                {/* 모달 헤더 */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{date} 푼 문제</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="모달 닫기"
                    >
                        ✕
                    </button>
                </div>

                {/* 문제 목록 */}
                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
                    {problems.map((problem, idx) => (
                        <a
                            key={`${problem.link}-${idx}`}
                            href={problem.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                        >
                            {/* 티어 이미지 */}
                            {renderProblemTierImage(problem.tierLevel)}
                            
                            {/* 문제 제목 */}
                            <span className="text-blue-600 font-medium hover:text-blue-800 hover:underline cursor-pointer transition-colors">
                                {problem.title}
                            </span>
                            
                            {/* 외부 링크 아이콘 */}
                            <ExternalLinkIcon />
                        </a>
                    ))}
                </div>
            </div>
        </button>
    );
}