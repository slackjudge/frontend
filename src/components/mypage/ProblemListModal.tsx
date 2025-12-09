import { Problem } from "../../types/mypage";
import { getTierImageUrl } from "../../constants/tierMap";

interface Props{
    isOpen: boolean;
    onClose: ()=>void; 
    date: string; 
    problems: Problem[];
}

export default function ProblemListModal({isOpen, onClose, date, problems}: Props){
    if(!isOpen) return null; 

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{date} 푼 문제</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
                    {problems.map((problem, idx) => {
                        const tierImageUrl = getTierImageUrl(problem.tierLevel);
                        return (
                            <a
                                key={idx}
                                href={problem.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                            >
                                {/* 티어 이미지 (로컬 assets 활용) */}
                                {tierImageUrl ? (
                                    <img 
                                        src={tierImageUrl} 
                                        alt={`Tier Level ${problem.tierLevel}`} 
                                        className="w-6 h-6"
                                    />
                                ) : (
                                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                )}
                                <span className="text-blue-600 font-medium hover:text-blue-800 hover:underline cursor-pointer transition-colors">
                                    {problem.title}
                                </span>
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
                            </a>
                        );
                    })}
                </div>
            </div>
            </div>
  );
}