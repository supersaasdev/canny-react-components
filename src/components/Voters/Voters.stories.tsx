import React from 'react';
import { Story, Meta } from '@storybook/react';

import Voters, { VotersProps } from './Voters';

export default {
    title: 'Components/Voters',
    component: Voters,
} as Meta;

const Template: Story<VotersProps> = (args) => <Voters {...args} />;

export const Board = Template.bind({});
Board.args = {
    url: 'https://lambdaapi.superopsalpha.com/sync',
    postId: '6089a5ccc314133780617f52',
    currentUser: {
        email: 'iamcsk90@gmail.com',
    },
};
