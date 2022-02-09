import React from 'react';
import { Story, Meta } from '@storybook/react';

import Roadmap, { RoadmapProps } from './Roadmap';

export default {
    title: 'Components/Roadmap',
    component: Roadmap,
} as Meta;

const Template: Story<RoadmapProps> = (args) => <Roadmap {...args} />;

export const Board = Template.bind({});
Board.args = {
    type: 'list',
    url: '',
    currentUser: {
        email: 'iamcsk90@gmail.com',
    },
};
