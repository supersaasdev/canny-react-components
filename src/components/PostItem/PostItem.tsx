import React, { useEffect, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import Upvote from '../Upvote/Upvote';
import Voters from '../Voters/Voters';
import Comments from '../Comments/Comments';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { UserWrapper } from '../UI';

const UsersWrapper = styled.div`
    margin: 10px;
    min-width: 250px;
    padding: 14px;
    border: 1px solid #ededed;
`;

const PostItemWrapper = styled.div`
    .userWrapper {
        padding: 10px;
    }
`;

export interface PostItemProps {
    postId: string;
    url: string;
    currentUser: unknown;
}

interface postItem {
    id: string;
    title: string;
    details: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts: [any, ...any[]];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PostItem = ({ type, url, postId, currentUser }) => {
    const [error, setError] = useState(null);
    const [postItem, setPost] = useState<postItem>();

    console.log('csk postItem', postItem);

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getPostItem',
            },
            body: JSON.stringify({ path: 'posts/retrieve', postID: postId }),
        })
            .then((response) => response.json())
            .then(
                (result) => {
                    console.log('CSK post item result', result);
                    setPost(result);
                },
                (error) => {
                    setError(error);
                },
            );
    }, [url]);

    return (
        <PostItemWrapper>
            <div className="flex">
                <UsersWrapper className="flex flex-wrap">
                    <Voters postId={postId} url={url} limit={0} currentUser={currentUser} />,
                </UsersWrapper>
                <div className="postItem">
                    <Upvote
                        email={currentUser?.email}
                        url={url}
                        postId={postItem?.id}
                        score={postItem?.score}
                        title={postItem?.title}
                        subTitle={postItem?.status}
                    ></Upvote>
                    <UserWrapper className="flex userWrapper">
                        <div className="userAvatar">
                            <div className="missingAvatar">B</div>
                        </div>
                        <div className="felx userInfo">
                            <div className="user">
                                <div className="userName"></div>
                                <div className="userName">{postItem?.author?.name}</div>
                            </div>
                            <ReactMarkdown className="markdown">{postItem?.details}</ReactMarkdown>
                        </div>
                    </UserWrapper>
                    <Comments url={url} postId={postItem?.id}></Comments>
                </div>
            </div>
        </PostItemWrapper>
    );
};

PostItem.defaultProps = {
    type: 'list',
    sortBy: 'score',
    postId: PropTypes.string.isRequired,
};

PostItem.propTypes = {
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    currentUser: PropTypes.object,
};

export default PostItem;
