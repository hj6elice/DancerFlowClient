import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { UserGameHistory } from '../../../interface';
import { useGetGameHistory } from '../../../api/useGetGameHistory';
import { useGetGameHistoryDetail } from '../../../api/useGetGameHistoryDetail';
import { useState } from 'react';
import ScoreInfo from './ScoreInfo';

export default function GameHistory() {
    const [selected, setSelected] = useState(0);
    const gamehistory = useGetGameHistory('user/game/history');
    const gamehistoryDetail = useGetGameHistoryDetail(selected);

    const handleClick = (music_id: number) => {
        setSelected(music_id);
    };

    return (
        <Section>
            <CardContainer>
                {gamehistory.map((game: UserGameHistory) => (
                    <MusicCard
                        key={game.music_id}
                        onClick={() => {
                            handleClick(game.music_id);
                        }}
                        selected={game.music_id === selected}
                    >
                        <Left>
                            <AlbumCover src={game.music_image_url}></AlbumCover>
                            <MusicInfo>
                                <MusicTitle>{game.music_name}</MusicTitle>
                                <p>{game.music_singer}</p>
                            </MusicInfo>
                        </Left>
                        <Right>
                            <UserGameHistoryPieCharts key={game.music_id} game={game} />
                            <FontAwesomeIcon icon={faChevronRight} style={{ marginLeft: '5px' }} />
                        </Right>
                    </MusicCard>
                ))}
            </CardContainer>
            <ScoreInfo gamehistoryDates={gamehistoryDetail.music_score_by_date}></ScoreInfo>
        </Section>
    );
}

const UserGameHistoryPieCharts = ({ game }: { game: UserGameHistory }) => {
    return (
        <>
            <PieChart width={50} height={40}>
                <Pie
                    data={[
                        { name: 'score', value: game.user_music_best_score },
                        { name: 'total', value: game.music_total_score - game.user_music_best_score }
                    ]}
                    dataKey="value"
                    cx={25}
                    cy={15}
                    innerRadius={15}
                    outerRadius={20}
                    startAngle={90}
                    endAngle={-270}
                    fill="rgba(255, 255, 255, 0.5)"
                    stroke="none"
                >
                    <Label
                        value={`${game.user_music_best_score}`}
                        position="center"
                        fill="#000"
                        fontSize={12}
                        fontWeight={600}
                        color={'#fff'}
                    />
                    <Cell key={`cell-0`} fill={COLORS[0]} />
                    <Cell key={`cell-1`} fill={COLORS[1]} />
                </Pie>
            </PieChart>
        </>
    );
};

const COLORS = ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)'];

const Section = styled.section`
    display: flex;
    height: 100%;
    padding: 1rem;
`;
const CardContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1.5rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 1rem;
    border-radius: 20px;
`;

interface MusicCardProps {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const MusicCard = styled.div<MusicCardProps>`
    display: flex;
    border-radius: 10px;
    max-height: 15%;
    background-color: ${(props) => (props.selected ? props.theme.pink : 'rgba(254, 35, 255, 0.3)')};
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    justify-content: space-between;
    align-items: center;
    h3 {
        font-size: 1.5rem;
        margin: 3px 0;
    }
    cursor: pointer;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const AlbumCover = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 10px;
`;

const MusicInfo = styled.div`
    text-align: start;
    p {
        font-size: 0.6rem;
    }
`;

const MusicTitle = styled.p`
    margin: 5px 0;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
`;