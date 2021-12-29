import React from 'react';
import { Story, Meta } from '@storybook/react';

import Upvote, { UpvoteProps } from './Upvote';

export default {
    title: 'Components/Upvote',
    component: Upvote,
} as Meta;

const Template: Story<UpvoteProps> = (args) => <Upvote {...args} />;

export const Board = Template.bind({});
Board.args = {
    url: 'https://lambdaapi.superopsalpha.com/sync',
    email: 'iamcsk90@gmail.com',
};
