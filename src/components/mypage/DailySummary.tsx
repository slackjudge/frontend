import { SelectedDateDetail } from "../../types/mypage";
import { getTierImageUrl } from "../../constants/tierMap";
import { CARD_STYLES } from "../../constants/cardStyles";

interface Props{
    data: SelectedDateDetail; //상위 (MyPage)에서 내려주는 날짜별 상세 데이터 
    onCountClick: () => void; // "푼 문제 수 " 클릭시 모달을 여는 함수 
    className?: string; // 추가 스타일링을 위한 className
}

export default function DailySummary({data, onCountClick, className}: Props){
    //TODO: 데이터가 없을때 안전 장치 
    
    return(
        <div className={`${className || 'w-[40%]'} h-full p-8 flex items-center justify-center bg-white`}>
            {/* 4개의 카드를 2x2 그리드로 배치 */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-[420px]">
                {/* 1. 푼 문제 수 카드 (클릭 가능한 버튼) */}
                <button
                    onClick = {onCountClick}
                    disabled = {data.solvedCount === 0} //0문제면 클릭방지 
                    className = {CARD_STYLES.CLICKABLE.combined}
                >
                    <span className={CARD_STYLES.LABEL}>푼 문제 수</span>
                    <div className="flex flex-col items-center"> 
                        <span className={CARD_STYLES.VALUE_HIGHLIGHT}>
                            {data.solvedCount}
                        </span>
                        {/* 디자인: 굵은 밑줄( 데이터가 있을때 표시*/}
                        {data.solvedCount >0 &&(
                            <div className={CARD_STYLES.UNDERLINE}></div>
                        )}
                    </div>
                </button>

                {/* 2. 총 점수 카드 */}
                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>총 점수</span>
                    <span className={CARD_STYLES.VALUE}>
                        {data.dailyScore}
                    </span>
                </div>

                {/* 3. 내 순위 카드 */}
                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>내 순위</span>
                    <span className={CARD_STYLES.VALUE}>
                        {/* 순위가 0이거나 데이터가 없으면 '-' 표시 */}
                        {data.dailyRank && data.dailyRank > 0 ? data.dailyRank : "-"}
                    </span>
                </div>

                {/* 4. 최고 난이도 (이미지 표시) */}
                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>최고 난이도</span>
                    <div className={CARD_STYLES.TIER_CONTAINER}> 
                        {(() => {
                            const tierImageUrl = getTierImageUrl(data.maxDifficulty);
                            return tierImageUrl ? (
                                <img
                                    src={tierImageUrl}
                                    alt={`Tier Level ${data.maxDifficulty}`}
                                    className="h-10 w-auto object-contain drop-shadow-sm"
                                />
                            ) : (
                                <span className="text-4xl text-gray-300">-</span>
                            );
                        })()}
                    </div>
                </div>

            </div>
        </div>
        
    ); 
}
