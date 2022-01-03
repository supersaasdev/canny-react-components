import styled from 'styled-components';

const UserWrapper = styled.div`
    .userInfo {
        padding-top: 4px;
    }

    .userAvatar {
        min-width: 25px;
        height: 25px;
        margin-right: 6px;
    }

    p {
        margin: 8px 0px;
    }

    .userAvatar .missingAvatar {
        font-size: 18px;
        color: #fff;
        width: 100%;
        height: 100%;
        background: #bbb;
        border-radius: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;

const PostsWrapper = styled.div`
    max-height: 250px;
    overflow-y: auto;
`;

export { UserWrapper, PostsWrapper };
