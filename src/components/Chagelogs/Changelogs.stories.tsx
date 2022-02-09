import React from 'react';
import { Story, Meta } from '@storybook/react';

import Changelogs, { ChangelogsProps } from './Changelogs';

export default {
    title: 'Components/Changelogs',
    component: Changelogs,
} as Meta;

const Template: Story<ChangelogsProps> = (args) => <Changelogs {...args} />;

export const Board = Template.bind({});
Board.args = {
    url: '',
    postId: '6089a5ccc314133780617f52',
    currentUser: {
        email: 'iamcsk90@gmail.com',
    },
};
