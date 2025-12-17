import { SelectedDateDetail } from "../../types/mypage";
import { getTierImageUrl } from "../../constants/tierMap";
import { CARD_STYLES } from "../../constants/cardStyles";

/*
author : 최하영
*/

interface Props{
    data: SelectedDateDetail; 
    onCountClick: () => void; 
    className?: string; 
}

export default function DailySummary(
    { data, onCountClick, className }: Readonly<Props>
) {
    
    return(
        <div className={`${className || 'w-[40%]'} h-full p-8 flex items-center justify-center bg-white`}>
            <div className="grid grid-cols-2 gap-5 w-full max-w-[420px]">
                <button
                    onClick = {onCountClick}
                    disabled = {data.solvedCount === 0} 
                    className = {CARD_STYLES.CLICKABLE.combined}
                >
                    <span className={CARD_STYLES.LABEL}>푼 문제 수</span>
                    <div className="flex flex-col items-center"> 
                        <span className={CARD_STYLES.VALUE_HIGHLIGHT}>
                            {data.solvedCount}
                        </span>
                        {data.solvedCount >0 &&(
                            <div className={CARD_STYLES.UNDERLINE}></div>
                        )}
                    </div>
                </button>

                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>총 점수</span>
                    <span className={CARD_STYLES.VALUE}>
                        {data.dailyScore}
                    </span>
                </div>

                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>내 순위</span>
                    <span className={CARD_STYLES.VALUE}>
                        {/* 순위가 0이거나 데이터가 없으면 '-' 표시 */}
                        {data.dailyRank && data.dailyRank > 0 ? data.dailyRank : "-"}
                    </span>
                </div>

                <div className={CARD_STYLES.BASE}>
                    <span className={CARD_STYLES.LABEL}>최고 난이도</span>
                    <div className={CARD_STYLES.TIER_CONTAINER}> 
                        {data.solvedCount === 0 ? (
                            <span className={CARD_STYLES.VALUE}>-</span>
                        ) : (() => {
                            const tierImageUrl = getTierImageUrl(data.maxDifficulty);
                            return tierImageUrl ? (
                                <img
                                    src={tierImageUrl}
                                    alt={`Tier Level ${data.maxDifficulty}`}
                                    className="h-10 w-auto object-contain drop-shadow-sm"
                                />
                            ) : (
                                <span className={CARD_STYLES.VALUE}>-</span>
                            );
                        })()}
                    </div>
                </div>

            </div>
        </div>
        
    ); 
}
