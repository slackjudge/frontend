import { SelectedDateDetail } from "../../types/mypage";

interface Props{
    data: SelectedDateDetail; //상위 (MyPage)에서 내려주는 날짜별 상세 데이터 
    onCountClick: () => void; // "푼 문제 수 " 클릭시 모달을 여는 함수 
}

export default function DailySummary({data, onCountClick}: Props){
    //TODO: 데이터가 없을때 안전 장치 
    
    return(
        <div className="w-[40%] h-full p-8 flex items-center justify-center bg-white">
            {/* 4개의 카드를 2x2 그리드로 배치 */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-[420px]">
                {/* 1. 푼 문제 수 카드 (클릭 가능한 버튼) */}
                <button
                    onClick = {onCountClick}
                    disabled = {data.solvedCount === 0} //0문제면 클릭방지 
                    className = "group relative bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col items-center justify-center h-40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                    <span className="text-gray-400 text-sm mb-3 font-medium">푼 문제 수</span>
                    <div className="flex flex-col items-center"> 
                        <span className="text-5xl font-medium text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                            {data.solvedCount}
                        </span>
                        {/* 디자인: 굵은 밑줄( 데이터가 있을때 표시*/}
                        {data.solvedCount >0 &&(
                            <div className="w-8 h-[4px] bg-gray-800 rounded-full"></div>
                        )}
                    </div>
                </button>

            </div>
        </div>
    ); 
}