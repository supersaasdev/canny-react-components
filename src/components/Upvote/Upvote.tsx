import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColumnListItem = styled.div`
    padding: 8px;

    .upvote {
        padding: 8px;
        border: 1px solid #dddddd;
        margin-right: 8px;
        border-radius: 2px;
        justify-content: center;
        background: hsla(0, 0%, 100%, 0.8);
        max-height: 50px;
        max-width: 40px;

        span:last-child {
            min-height: 13px;
            text-align: center;
            line-height: 13px;
            font-size: 15px;
            line-height: 22px;
            user-select: none;
        }
    }

    .item .title {
        font-size: 14px;
        margin: 4px 0px;
    }

    .item .ParentName {
        color: gray;
        align-self: flex-start;
        font-size: 12px;
    }
`;

const UpvoteIcon = styled.span`
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid rgba(35, 35, 35, 0.2);
    margin-bottom: 3px;
    transition: all 0.1s ease-in-out;
`;

export interface UpvoteProps {
    score: number;
    title: string;
    postId: string;
    boardName: string;
    url: string;
    email: string;
}

const createVote = (url: string, email: string, postID: string, voterID: string) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            action: 'canny',
            subaction: 'upVote',
        },
        body: JSON.stringify({ path: 'votes/create', postID: postID, voterID: voterID }),
    })
        .then((response) => response.json())
        .then(
            (result) => {
                console.log('CSK upvote result', result);
            },
            (error) => {
                console.log('CSK error', error);
            },
        );
};

const Upvote: React.FC<UpvoteProps> = ({ url, postId, score, title, boardName, email }) => {
    const upvote = useCallback(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getUser',
            },
            body: JSON.stringify({ path: 'users/retrieve', email: email }),
        })
            .then((response) => response.json())
            .then(
                (user) => {
                    createVote(url, email, postId, user.id);
                },
                (error) => {
                    console.log(' error', error);
                },
            );
    }, []);

    return (
        <div className="flex items-center">
            <ColumnListItem className="flex board-title items-baseline">
                <div className="upvote flex flex-col items-center" onClick={upvote}>
                    <UpvoteIcon />
                    <span>{score}</span>
                </div>
                <div className="item justify-start flex flex-col items-center items-baseline">
                    <div className="title font-bold">{title}</div>
                    <div className="ParentName font-bold uppercase text-base">{boardName}</div>
                </div>
            </ColumnListItem>
        </div>
    );
};
Upvote.propTypes = {
    score: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    boardName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default Upvote;
