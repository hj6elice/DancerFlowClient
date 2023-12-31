import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFire, faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Like = 'isLiked'
}
interface FilterProps {
    onFilter: (type: FilterType) => void;
    selected: FilterType | '';
    onSearch: (input: string) => void;
    inputValue: string;
    setInputValue: (input: string) => void;
}
const Filter = ({ onFilter, selected, onSearch, inputValue, setInputValue }: FilterProps) => {
    return (
        <Wrapper>
            <FilterWrapper>
                <InputWrapper>
                    <InputItem
                        placeholder="Search"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSearch(inputValue);
                                setInputValue('');
                            }
                        }}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        id="search-input"
                    />
                    <InputIconWrapper
                        onClick={() => {
                            onSearch(inputValue);
                            setInputValue('');
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </InputIconWrapper>
                </InputWrapper>
                <ItemWrapper onClick={() => onFilter(FilterType.Popular)}>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faFire} />
                    </BtnIconWrapper>
                    <Item id="popular" selected={selected}>
                        <H1>인기순</H1>
                    </Item>
                </ItemWrapper>
                <ItemWrapper onClick={() => onFilter(FilterType.Latest)}>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faMusic} />
                    </BtnIconWrapper>
                    <Item id="latest" selected={selected}>
                        <H1>최신순</H1>
                    </Item>
                </ItemWrapper>
                <ItemWrapper onClick={() => onFilter(FilterType.Like)}>
                    <BtnIconWrapper>
                        <FontAwesomeIcon icon={faHeart} />
                    </BtnIconWrapper>
                    <Item id="isLiked" selected={selected}>
                        <H1>찜한 목록</H1>
                    </Item>
                </ItemWrapper>
            </FilterWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const FilterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
`;

interface ItemProps {
    selected: string;
    id: string;
}

const Item = styled.div<ItemProps>`
    background: ${(props) => (props.selected === props.id ? props.theme.pink : 'white')};
    box-shadow: ${(props) => (props.selected === props.id ? `0px 0px 20px ${props.theme.pink}` : 'none')};
    width: 138px;
    height: 56px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: end;
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
        box-shadow: 0px 0px 20px ${(props) => props.theme.pink};
    }
`;

const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
`;

const InputItem = styled.input`
    background: white;
    width: 200px;
    height: 40px;
    border-radius: 15px;
    padding: 0 40px 0 20px;
    transition: box-shadow 0.2s ease-in-out;
    &:focus,
    &:hover {
        box-shadow: 0px 0px 20px ${(props) => props.theme.pink};
    }
`;
const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 224px;
    height: 40px;
    margin-right: 20px;
    cursor: pointer;
`;

const InputIconWrapper = styled.div`
    position: absolute;
    right: 10px;
`;
const BtnIconWrapper = styled.div`
    position: absolute;
    top: 10px;
`;

const H1 = styled.h1`
    margin-bottom: 5px;
`;

export default Filter;
