import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserWrapper, PostsWrapper } from '../UI';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const PostItemWrapper = styled.div`
    margin-top: 20px;

    .postItem {
        padding: 10px;
    }

    .grayText {
        color: gray;
    }

    .sortItem {
        margin-right: 10px;
    }
`;

export interface CommentsProps {
    url: string;
    postId: string;
    limit: number;
}

interface comment {
    value: string;
    id: string;
    private: boolean;
    mentions: [any];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts: [any, ...any[]];
}

const Comments: React.FC<CommentsProps> = ({ url, postId, limit }) => {
    const [comments, setComments] = useState<comment[]>([]);
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getUser',
            },
            body: JSON.stringify({ path: 'comments/list', postID: postId, limit: limit }),
        })
            .then((response) => response.json())
            .then(
                (item) => {
                    console.log('CSK item', item.comments);
                    setComments(item.comments);
                },
                (error) => {
                    console.log(' error', error);
                },
            );
    }, [postId, limit]);

    return (
        <PostItemWrapper>
            <div className="flex f14 p10">
                <div className="uppercase grayText grow">Activity</div>
                <div className="actions">
                    <span className="uppercase grayText">NEWEST</span>
                </div>
            </div>
            <PostsWrapper>
                {comments.map((comment: { value: string; id: string }) => {
                    return comment.value.length ? (
                        <div key={comment.id} className="postItem">
                            <UserWrapper className="flex userWrapper">
                                <div className="userAvatar">
                                    <div className="missingAvatar">B</div>
                                </div>
                                <div className="felx userInfo">
                                    <div className="user">
                                        <div className="userName"></div>
                                        <div className="userName">{comment?.author?.name}</div>
                                    </div>
                                    <ReactMarkdown className="markdown">{comment.value}</ReactMarkdown>
                                </div>
                            </UserWrapper>
                        </div>
                    ) : null;
                })}
            </PostsWrapper>
        </PostItemWrapper>
    );
};
Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Comments;
