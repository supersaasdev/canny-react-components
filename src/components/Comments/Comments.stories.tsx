import React from 'react';
import { Story, Meta } from '@storybook/react';

import Comments, { CommentsProps } from './Comments';

export default {
    title: 'Components/Comments',
    component: Comments,
} as Meta;

const Template: Story<CommentsProps> = (args) => <Comments {...args} />;

export const Board = Template.bind({});
Board.args = {
    url: '',
    postId: '6089a5ccc314133780617f52',
    currentUser: {
        email: 'iamcsk90@gmail.com',
    },
};
