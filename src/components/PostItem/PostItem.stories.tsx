import React from 'react';
import { Story, Meta } from '@storybook/react';

import PostItem, { PostItemProps } from './PostItem';

export default {
    title: 'Components/PostItem',
    component: PostItem,
} as Meta;

const Template: Story<PostItemProps> = (args) => <PostItem {...args} />;

export const Board = Template.bind({});
Board.args = {
    url: '',
    postId: '6089a5ccc314133780617f52',
    currentUser: {
        email: 'iamcsk90@gmail.com',
    },
};
