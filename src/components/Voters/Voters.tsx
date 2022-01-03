import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UserWrapper } from '../UI';

const UserContainer = styled.div`
    margin: 10px;
`;

const VotersWrapper = styled(UserWrapper)`
    .uppercaseHeader {
        color: #999;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        line-height: 17px;
        text-transform: uppercase;
        margin: 12px;
    }
`;

export interface VotersProps {
    url: string;
    postId: string;
    limit: number;
}

const Voters: React.FC<VotersProps> = ({ url, postId, limit }) => {
    const [votes, setVoters] = useState<voter[]>([]);
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                action: 'canny',
                subaction: 'getUser',
            },
            body: JSON.stringify({ path: 'votes/list', postID: postId, limit: limit }),
        })
            .then((response) => response.json())
            .then(
                (voters) => {
                    console.log('CSK voters', voters);
                    const votes = voters.votes.map(
                        (vote: {
                            voter: {
                                email: string;
                                id: string;
                                name: string;
                                created: string;
                                isAdmin: boolean;
                                userID: string;
                            };
                        }) => {
                            return {
                                email: vote.voter.email,
                                id: vote.voter.id,
                                name: vote.voter.name,
                                created: vote.voter.created,
                                isAdmin: vote.voter.isAdmin,
                                userID: vote.voter.userID,
                            };
                        },
                    );
                    setVoters(votes);
                },
                (error) => {
                    console.log(' error', error);
                },
            );
    }, [postId, limit]);

    return (
        <VotersWrapper>
            <div className="uppercaseHeader">Voters</div>
            <div className="users">
                {votes.map(
                    (voter: {
                        id: React.Key | null | undefined;
                        avatar: string | undefined;
                        name: string | undefined;
                    }) => {
                        return (
                            <UserContainer key={voter.id} className="flex items-center">
                                <div className="userAvatar">
                                    <div className="missingAvatar">B</div>
                                </div>
                                <div className="user" key={voter.id}>
                                    <div className="userName">{`${voter.name}`}</div>
                                </div>
                            </UserContainer>
                        );
                    },
                )}
            </div>
        </VotersWrapper>
    );
};
Voters.propTypes = {
    postId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Voters;
