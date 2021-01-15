import React from 'react';
import nextId from "react-id-generator";

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
    padding-bottom: 40px;
`;

export default class App extends React.Component {
    state = {
        data: [
            {label: 'Hard Work', important: false, like: false, id: nextId()},
            {label: 'Hard Life', important: false, like: false, id: nextId()},
            {label: 'Hard JS', important: true, like: true, id: nextId()}
        ],
        term: '',
        filter: 'all'
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like === true);
        } else {
            return items;
        }
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        } else {
            return items.filter( (item) => {
                return item.label.toLowerCase().indexOf(term) > -1;
            });
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            like: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
    
    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
        
            const newItem = {...data[index], important: !data[index].important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    onToggleLiked = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
        
            const newItem = {...data[index], like: !data[index].like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state; 

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader liked={liked} allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}    
                    onToggleLiked={this.onToggleLiked}    
                />
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        ); 
    }
}

