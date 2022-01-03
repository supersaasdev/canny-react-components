import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import groupBy from 'lodash/groupBy';
import styled from 'styled-components';
import Upvote from '../Upvote/Upvote';
import fetch from 'unfetch';

import '../util.css';

const Container = styled.div`
    .board:nth-child(1) .dot {
        background: blue;
    }
    .board:nth-child(2) .dot {
        background: green;
    }
    .board:nth-child(3) .dot {
        background: orange;
    }
`;
const Column = styled.div`
    min-width: 300px;
    max-width: 300px;
    height: 500px;
    background: #f5f5f5;
    box-shadow: 0 4px 5px #f5f5f5;
    margin: 10px;
    border-radius: 4px;
`;
const ColumnHeader = styled.div`
    padding: 14px;

    .title {
        font-size: 16px;
        font-weight: bold;
    }

    .dot {
        width: 8px;
        height: 8px;
        margin: 0 10px 2px 0;
        border-radius: 100%;
    }
`;
const ColumnList = styled.div`
    height: calc(100% - 42px);
`;

export interface RoadmapProps {
    type: string;
    url: string;
    limit: number;
    sortBy?: 'score' | 'newest' | 'oldest' | 'relevance' | 'statusChanged';
    currentUser: unknown;
}

interface postBoards {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts: [any, ...any[]];
}

const Roadmap: React.FC<RoadmapProps> = ({ url, sortBy, currentUser, limit }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState<postBoards[]>([]);

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getPosts',
            },
            body: JSON.stringify({ path: 'posts/list', sort: sortBy, limit: limit }),
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    const postGroup = groupBy(result.posts, 'status');
                    const keys = Object.keys(postGroup);
                    const postBoards = keys.map((item) => {
                        return {
                            title: item,
                            posts: postGroup[item],
                        };
                    });
                    setPosts(postBoards);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, [sortBy, limit]);
    return (
        <Container className="Canny-Container flex h-full flex-wrap">
            {posts.map((item) => {
                const { title, posts } = item;
                return (
                    <Column className="board overflow-hidden overflow-hidden" key={uuid() + 'col'}>
                        <ColumnHeader className="flex board-title flex-flow items-center">
                            <div className="dot"></div>
                            <div className="title capitalize">{title}</div>
                        </ColumnHeader>
                        <ColumnList className="board-list overflow-scroll p-4">
                            {posts.map((_postItem: any) => {
                                return (
                                    <div className="flex" key={uuid() + 'collist'}>
                                        <Upvote
                                            email={currentUser?.email}
                                            url={url}
                                            postId={_postItem.id}
                                            score={_postItem.score}
                                            title={_postItem.title}
                                            subTitle={_postItem.board.name}
                                        ></Upvote>
                                    </div>
                                );
                            })}
                        </ColumnList>
                    </Column>
                );
            })}
        </Container>
    );
};

Roadmap.defaultProps = {
    type: 'list',
    sortBy: 'score',
    limit: 100,
};

Roadmap.propTypes = {
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    sortBy: PropTypes.oneOf(['score', 'newest', 'oldest', 'relevance', 'statusChanged']),
    currentUser: PropTypes.object,
};

export default Roadmap;
