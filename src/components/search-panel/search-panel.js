import React from 'react';

import './search-panel.css';
import styled from 'styled-components';

const SearchInput = styled.input`
    width: auto;
    flex-grow: 1;
    margin-right: 3px;
`;

export default class SearchPanel  extends React.Component {
    state = {
        term: ''
    }

    onUpdateSearch = (e) => {
        const term = e.target.value.toLowerCase();
        this.setState({term})
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <SearchInput
                type='text'
                placeholder='Поиск по записям'
                className='form-control'
                onChange={this.onUpdateSearch}
            />
        );
    }
}